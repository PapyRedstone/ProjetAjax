'use strict'

var ws = new WebSocket('ws://localhost:12345');
var login = "cir2";

$('#chat-send').unbind('click').click(function(event){
  event.preventDefault();

  ws.send(login + ':' + $('#btn-input').val());
  $('#btn-input').val("");
  return false;
});

ws.onopen = function(){
  console.log("Connection establish");
}

ws.onmessage = function(event){
  var txt = $('#chat-room');
  console.log(event.data);
  txt.val(txt.val() + event.data + '\n')
  txt.scrollTop(txt.prop('scrollHeight'));
}

ws.onclose = function(){
  console.log("Connection Closed")
}
