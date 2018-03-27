'use strict';

function callback(txt){
    console.log(txt);
    console.log(JSON.parse(txt));
}

window.onload = function (){
    //OK
    //ajaxRequest('GET','/php/request.php/image',callback);
    //ajaxRequest('GET','/php/request.php/image/1',callback);
    //ajaxRequest('GET','/php/request.php/comment/1',callback);

    //En cours de test
    ajaxRequest('PUT','/php/request.php/comment/1',callback,'login=alex&text=NON');
}

