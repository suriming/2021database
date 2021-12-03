const mysql = require('mysql');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '110318', // 이전에 입력했던 비밀번호
    database: 'db', // 이전에 입력했던 데이터베이스 명
    multipleStatements: true,
    connectionLimit: 1000,
});

// query 함수는 db에 sql을 날리고 결과 값을 return 하는 함수입니다
exports.query = query => new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
        if (err) {
            console.log('실패1');
            return reject(err);
        }

        return connection.query(query, (err2, rows) => {
            connection.release();
            if (err2) {
                console.log('실패2');
                return reject(err2);
            }
            return resolve(rows);
        })
    });
});