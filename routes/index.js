const express = require('express');
const path = require('path');
const oracledb = require('oracledb');
const dbconfig = require('../dbconfig');

const router = express.Router();

const html = 'text/html; charset=utf-8';

// show index page
router.get('/',(req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'index.html'));
    // handlebars 뷰 엔진으로 응답 처리
    res.render('index', {title: 'index'});
});

router.get('/sungjuk',(req, res) => {
    res.render('sungjuk', {title: '성적 처리'});
});

router.post('/sungjuk',async (req, res, next) => {
    // 폼으로 전송된 데이터들은 req.body, req.body.폼이름 등으로 확인 가능
    // console.log(req.body);
    // console.log(req.body.name, req.body.kor, req.body.eng, req.body.mat);

    let {name, kor, eng, mat} = req.body;
    kor = parseInt(kor)
    eng = parseInt(eng)
    mat = parseInt(mat)
    console.log(name, kor, eng, mat);

    // 성적처리
    let [tot, avg, grd] = [kor + eng + mat, (kor + eng + mat) / 3, '가']
    if (avg >= 90) grd = '수';
    else if (avg >= 80) grd = '우';
    else if (avg >= 70) grd = '미';
    else if (avg >= 60) grd = '양';

    console.log(tot, avg, grd);

    // 데이터베이스 처리 - sungjuk 테이블에 insert
    // 한 번 만든 다음에 다시 실행하면 이미 존재하고 있어서 오류 뜸
    let conn = null;
    let sql = 'insert into sungjuk (sjno, name, kor, eng, mat, tot, avg, grd) values (sjno.nextval, :1, :2, :3, :4, :5, :6, :7)';
    let params = [name, kor, eng, mat, tot, avg, grd];
    try {
        oracledb.initOracleClient({libDir: 'c:/Java/instantclient_19_17'});
        conn = await oracledb.getConnection(dbconfig);
        let result = await conn.execute(sql, params);
        await conn.commit();
        console.log(result);
    } catch (e) {
        console.log(e);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (e) {
                console.log(e);
            }
        }
    }


    res.redirect(304, '/');
});

// 단순한 그림 파일을 화면에 표시하기 위해
// 일일이 라우팅 설정하는 것은 번거로움
/*router.get('/bird.jpg',(req, res) => {
    // 응답으로 지정판 파일의 내용을 전송함
    res.sendFile(path.join(__dirname, '../static/img', 'bird.jpg'));
});*/

// 이 파일이 모듈로 작동하는 것을 나타냄
module.exports = router;