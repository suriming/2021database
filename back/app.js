const app = require('express')();

app.get('/', (req, res) => {
    res.send('안녕 백엔드');
});

app.listen(3085, () => {
    console.log('백엔드 서버 ${3085}번 포트에서 작동중.');
});


// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

// const users = require('../utils/users')();
// const Message = require('../utils/message')();

// socket.on("createMessage", ({ id, msg }) => {
//     const user = usersDB.getUser(id);
//     if (user) {
//       io.to(user.room).emit("newMessage", new Message(user.name, msg, id));
//     }
//   });