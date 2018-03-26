'use strict';

function callback(txt){
    console.log(txt);
    console.log(JSON.parse(txt));
}

window.onload = function (){
    ajaxRequest('GET','/php/request.php/chat',callback);
//    ajaxRequest('GET','/php/request.php/image',callback);
}
