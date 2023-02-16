const express = require('express');
const path = require('path');
const logger = require('morgan');   // 로그 출력기
const { engine } = require('express-handlebars');

// 라우팅 외부 작성
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const aboutRouter = require('./routes/about');

const app = express();
const port = process.env.PORT || 3000;

// view 템플릿 엔진 설정
app.engine('hbs', engine({
    extname: '.hbs', defaultLayout: 'layout'
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// 라우팅을 거치지 않고
app.use(express.static(path.join(__dirname, 'static')));

// 로그 설정
app.use(logger('dev'));

// index에 대한 route handler 지정
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/about', aboutRouter);

// 404 처리
app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

// 500 처리
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.sendFile(path.join(__dirname, 'public', '500.html'));
});

app.listen(port, () => {
    console.log('express 서버가 실행 중... 중지하려면 ctrl+c를 누르세요!');
});