'use strict';

function callback(txt){
    console.log(txt);
//    console.log(JSON.parse(txt));
}

window.onload = function (){
    //En cours de test
    ajaxRequest('PUT','/php/request.php/comment/1',callback,'login=alex&text=COUCOU');

    //OK
    //ajaxRequest('GET','/php/request.php/image',callback);
    //ajaxRequest('GET','/php/request.php/image/1',callback);
    ajaxRequest('GET','/php/request.php/comment/0',callback);
}

