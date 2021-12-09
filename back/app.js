var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var http = require('http')
const express = require('express');
const db = require('./modules/db');
const app = express();
// const friendsRouter = require('./routes/friends');
const cors = require('cors');
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}
app.use(cors(corsOptions));

// Cors --> cross domian problem solving for socket

// app.use(cors({ // register cors module
//   credentials: true, // allow credentials
//   origin: function(origin, callback) { // check API caller url
//     if(['http://localhost:8080'].indexOf(origin) != -1){ // url is allowed client url
//       callback(null, true);
//     }
//     else{
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }));


app.get('/api/', (req, res) => {
    res.send('안녕 백엔드');
});

// indexRouter process HTTP request of http://127.0.0.1/~ 
var indexRouter = require('./routes/index');

// use router module
var userRouter = require('./routes/user');
var chatlistRouter = require('./routes/chatlist');
var router_friends = require('./routes/friends');
var router_myinfo = require('./routes/myinfo');
var router_location = require('./routes/location');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.get('/', (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*")
// })
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/chatlist', chatlistRouter);
app.use('/api/friends',router_friends);
app.use('/api/myinfo', router_myinfo);
app.use('/api/location', router_location);

app.use(function(req, res, next) {
    next(createError(404));
  });

// app.listen(3085, () => {
//     console.log('백엔드 서버 ${3085}번 포트에서 작동중.');
// });
http.createServer(app).listen(8080, function(){
    console.log('Server start!');
})

module.exports = app;
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