'use strict';

function callback(txt){
    console.log(txt);
//    console.log(JSON.parse(txt));
}

window.onload = function (){
    //En cours de test

    //OK
<<<<<<< HEAD
    //ajaxRequest('POST','/php/request.php/comment',callback,'login=alex&text=SLT&id_photo=1');
    //ajaxRequest('PUT','/php/request.php/comment/1',callback,'login=alex&text=COUCOOU');
    //ajaxRequest('GET','/php/request.php/image',callback);
    //ajaxRequest('GET','/php/request.php/image/1',callback);
    ajaxRequest('GET','/php/request.php/comment/1',callback);
=======
    //ajaxRequest('PUT','/php/request.php/comment/1',callback,'login=alex&text=COUCOOU');
    ajaxRequest('GET','/php/request.php/image',callback);
    ajaxRequest('GET','/php/request.php/image/1',callback);
    ajaxRequest('GET','/php/request.php/comment/0',callback);
>>>>>>> e119381faf54367b178ac54902fea533c083283d
}

