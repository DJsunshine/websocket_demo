// 作战区 对方游戏区
var Remote = function (socket) {
  // 游戏对象
  var game;

  // 绑定按钮事件
  var bindEvents = function () {
    socket.on('init',function(data){
      start(data.type,data.dir)
    })
    socket.on('next',function(data){
      game.performNext(data.type,data.dir)
    })

    socket.on('roate',function(data){
      game.rotate()
    })

    socket.on('right',function(data){
      game.right()
    })

    socket.on('down',function(data){
      game.down()
    })

    socket.on('left',function(data){
      game.left()
    })

    socket.on('fall',function(data){
      game.fall()
    })

    socket.on('fixed',function(data){
      game.fixed()
    })

    socket.on('line',function(data){
      game.checkClear()
      game.addScore(data)
    })



  }
  // 开始
  var start = function (type, dir) {
    var doms = {
      gameDiv: document.getElementById('remote_game'),
      nextDiv: document.getElementById('remote_next'),
      timeDiv: document.getElementById('remote_time'),
      scoreDiv: document.getElementById('remote_score'),
      resultDiv: document.getElementById('remote_gameover')
    }
    game = new Game();
    game.init(doms, type, dir);
  }
  bindEvents();
}