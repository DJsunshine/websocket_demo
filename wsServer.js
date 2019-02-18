var app = require('http').createServer();
var io =require('socket.io')(app)

var PORT = 3000

// 客户端计数
var clientCount = 0 
// 用来存储客服端socket
var socketMap={}
var bindListener=function(socket,event){
  socket.on(event,function(data){
    if(socket.clientNum%2==0){
      socketMap[socket.clientNum-1].emit(event,data)
    }else{
      socketMap[socket.clientNum+1].emit(event,data)
    }
  })
}
app.listen(PORT)
io.on('connection',function(socket){
  clientCount+=1
  socket.clientNum = clientCount
  socketMap[clientCount]=socket
  if(clientCount%2==1){
    socket.emit('waiting','waiting for another person')
  }else{
    socket.emit('start')
    socketMap[clientCount-1].emit('start')
  }

  bindListener(socket,'init');
  bindListener(socket,'next');
  bindListener(socket,'rotate');
  bindListener(socket,'right');
  bindListener(socket,'down');
  bindListener(socket,'left');
  bindListener(socket,'fall');
  bindListener(socket,'fixed');
  bindListener(socket,'line');



  socket.on('disconnection',function(){

  })
})

console.log('webSocket listening on port:' + PORT)