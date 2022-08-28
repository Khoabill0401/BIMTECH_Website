const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    // res.send("<H1>BIMTECH</H1>");
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', function(){
        console.log('A user disconnected');
    });
    socket.on('Chat message', function(msg){
        console.log(msg);
        socket.broadcast.emit('Chat message', msg);
    });
})

http.listen(3000, function(){
    console.log("Listening to port 3000");
})