'use strict';

function callback(txt){

}

function processimages(txt){
    var data = JSON.parse(txt);
    var ids= [];
    var i=0;
    data.forEach(id => {
        ids[i++]=id.id_photo;
    });
    var $htmltemplate=$("#original").clone().removeAttr("id");
    $("#original").remove();
    var path="img/small/img";
    for(i=0;i<ids.length;i++){       
        $htmltemplate.find("img").attr("src",path+ids[i]+".png");
        $htmltemplate.appendTo($("#data"));
        $htmltemplate=$htmltemplate.clone();
    }
}

function callbackAuth(txt){
    console.log("Connexion reussiee");
    var userName = $("input#authUserName").html();
    //Faire les cookies
}

function auth(){
    var userName = $("input#authUserName").val();
    var password = $("input#authPassword").val();
    if($("input#authUserName").val() == "" || $("input#authPassword").val() == ""){
        return;
  }
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
    document.getElementById("login").onclick = function() {auth()};
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

