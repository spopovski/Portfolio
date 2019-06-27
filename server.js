var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

var tasks = require('./routes/tasks')
var Users = require('./routes/Users')
var socket = require('socket.io');

app.use('/api', tasks)
app.use('/users', Users)

server = app.listen(port, () => {
    console.log("Server is running on port: " + port)
})

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});