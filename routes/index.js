const express = require('express');
const router = express.Router();

const html = 'text/html; charset=utf-8';

// show index page
router.get('/',(req, res) => {
    res.type(html);
    res.end('<h1>index 페이지입니다!!</h1>');
});

// 이 파일이 모듈로 작동하는 것을 나타냄
module.exports = router;