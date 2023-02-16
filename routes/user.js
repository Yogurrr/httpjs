const express = require('express');
const path = require("path");
const router = express.Router();

// show user page
router.get('/',(req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'user.html'));
    res.render('user', {title : 'user'});
});

router.get('/add',(req, res) => {
    res.type(html);
    res.end('<h1>user 가입 페이지입니다!!</h1>');
});

router.get('/view',(req, res) => {
    res.type(html);
    res.end('<h1>user 상세정보 페이지입니다!!</h1>');
});

// 이 파일이 모듈로 작동하는 것을 나타냄
module.exports = router;