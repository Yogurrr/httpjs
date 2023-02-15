const express = require('express');
const path = require('path');
const router = express.Router();

const html = 'text/html; charset=utf-8';

// show index page
router.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 단순한 그림 파일을 화면에 표시하기 위해
// 일일이 라우팅 설정하는 것은 번거로움
/*router.get('/bird.jpg',(req, res) => {
    // 응답으로 지정판 파일의 내용을 전송함
    res.sendFile(path.join(__dirname, '../static/img', 'bird.jpg'));
});*/

// 이 파일이 모듈로 작동하는 것을 나타냄
module.exports = router;