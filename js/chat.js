'use strict'

var ws = new WebSocket('ws://172.17.5.64:12345');
var login = "name";

$('#chat-send').unbind('click').click(function(event){
  event.preventDefault();

  ws.send(login + ':' + $('#chat-message').val());
});

ws.onopen = function(){
  console.log("Connection establish");
}

ws.onmessage = function(event){
  var txt = $('#chat-room');
  txt.val(txt.val() + event.data + '\n')
  txt.scrollTop(txt.prop('scrollHeight'));
}

ws.onclode = function(){
  console.log("Connection Closed")
}
