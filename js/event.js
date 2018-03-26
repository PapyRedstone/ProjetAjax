'use strict';

function callback(txt){
    document.getElementById("test").innerHTML = txt;
    alert("Bonjour");
}
document.onload = function(){
    ajaxRequest('GET','projetajax.fr/php/request.php',callback);
}
