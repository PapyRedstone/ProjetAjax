'use strict';

function callback(txt){

}

function processimages(txt){
    var data = JSON.parse(txt);
    var i=0;
    var htmltemplate=$("#test").clone().removeAttr('id');
    console.log(htmltemplate[0]);
    console.log("wtf");
    var path="img/small/img";
    //console.log(data);
    for(var d in data){
        //console.log(path+data[d].id_photo+".png");
        console.log(htmltemplate[0]);
        $("img",htmltemplate).attr("src",path+data[d].id_photo+".png");
        console.log(htmltemplate[0]);
        //$("img",htmltemplate).after($("img",htmltemplate).attr("src",path+data[d].id_photo+".png"));
        //console.log(htmltemplate[0]);
    }
    console.log(htmltemplate[0]);
    $("#data").append(htmltemplate[0]);
    console.log("terminé");
}

function callbackAuth(txt){
    console.log("Connexion reussiee");
    var userName = $("div#authUserName").html();
    //Faire les cookies
}

function auth(){
    var userName = $("div#authUserName").html();
    var password = $("div#authPassword").html();
    ajaxRequest('GET','php/request.php/auth',callback,'login='+userName+'&password='+password);
}

function callbackComment(txt){
    var comment = $("#comment");
    var data = JSON.parse(txt);
    for(var d in data){
	var p = document.createElement('p');
	p.innerHTML = data[d]["userName"]+":"+data[d]["text"];
	p = $(p);
	p.attr('id',data[d]["id_comment"]);
	comment.append(p);
    }
}

function getComment(idPhoto){
    ajaxRequest('GET','/php/request.php/comment/'+idPhoto,callbackComment);
}

window.onload = function (){
    //ajaxRequest('DELETE','/php/request.php/user',callback,'login=azerty')
    //ajaxRequest('DELETE','/php/request.php/comment/1',callback,'login=alex')
    //ajaxRequest('POST','/php/request.php/user',callback,'login=azerty&password=azerty');
    //ajaxRequest('POST','/php/request.php/comment',callback,'login=azerty&text=SLT&id_photo=1');
    //ajaxRequest('PUT','/php/request.php/comment/1',callback,'login=alex&text=COUCOOU');
    //ajaxRequest('GET','php/request.php/auth',callback,'login=azerty&password=azerty');
    ajaxRequest('GET','/php/request.php/image',processimages);
    console.log("request done");
    //ajaxRequest('GET','/php/request.php/image/1',callback);
    //ajaxRequest('GET','/php/request.php/comment/1',callback);
    getComment(1);
}

