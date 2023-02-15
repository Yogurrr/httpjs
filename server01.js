const http = require('http');
const port = process.env.PORT || 3000;

// localhost:3000 요청 시 처리
const server = http.createServer((req, res) => {
    // 응답헤더 작성 : 응답 코드, 응답 데이터 형식 지정
    res.writeHead(200, {'Content-Type':'text/plain'});
    // 응답 메시지 전송
    res.end('Hello, World!!');
});

server.listen(port, () => {
    console.log('서버가 실행 중... 중지하려면 ctrl+c를 누르세요!');
});