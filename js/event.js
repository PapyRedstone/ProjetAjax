'use strict';

function callback(txt){
    console.log(txt);
//    console.log(JSON.parse(txt));
}

window.onload = function (){
    //En cours de test
    

    //OK
    ajaxRequest('DELETE','/php/request.php/user',callback,'login=azerty')
    //ajaxRequest('DELETE','/php/request.php/comment/1',callback,'login=alex')
    ajaxRequest('POST','/php/request.php/user',callback,'login=azerty&password=azerty');
    ajaxRequest('POST','/php/request.php/comment',callback,'login=azerty&text=SLT&id_photo=1');
    //ajaxRequest('PUT','/php/request.php/comment/1',callback,'login=alex&text=COUCOOU');
    //ajaxRequest('GET','/php/request.php/image',callback);
    //ajaxRequest('GET','/php/request.php/image/1',callback);
    ajaxRequest('GET','/php/request.php/comment/1',callback);
}

