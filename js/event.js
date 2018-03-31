'use strict';

function callback(txt){}

function processimages(txt){
    var data = JSON.parse(txt);
    var ids= [];
    var i=0;
    data.forEach(id => {
        ids[i++]=id.id_photo;
    });
    var $htmltemplate=$("#original-img").clone().removeAttr("id");
    $("#original-img").removeAttr("id");
    var path="img/small/img";
    for(i=1;i<ids.length;i++){       
        $htmltemplate.find("img").attr("src",path+ids[i]+".png");
        $htmltemplate.find("img").attr("onclick","openImg("+ids[i]+")");
        $htmltemplate.appendTo($("#data"));
        $htmltemplate=$htmltemplate.clone();
    }
}
function callbackComment(txt){
    var data = JSON.parse(txt);
    var $htmltemplate=$("#original-comment").clone().removeAttr("id");
    $("#original-comment").remove();
    console.log($htmltemplate[0]);

    var parent = $htmltemplate.parent();
    for(var d in data){
        $htmltemplate.find("strong").text(data[d]["userName"]);
        $htmltemplate.find("div.panel-body").text(data[d]["text"]);
        console.log($htmltemplate.find("div.panel-body"));
        $htmltemplate.appendTo($("#comments"));
        $htmltemplate=$htmltemplate.clone();   
    }
}

function createUser(){
    var userName = $("#authUserName").val();
    var password = $("#authPassword").val();
    ajaxRequest('POST','/php/request.php/user',callbackAuth,'login='+userName+'&password='+password);
}

function callbackAuth(txt){
    var data = JSON.parse(txt);
    console.log(data);
    //console.log("Connexion reussie");
    var userName = $("input#authUserName").html();
    Cookies.set('userName',userName);
}

function auth(){
    var userName = $("#authUserName").val();
    var password = $("#authPassword").val();
    if($("#authUserName").val() == "" || $("#authPassword").val() == ""){
        alert("Les deux champs doivent être remplis !");
        return;
    }
    //ajaxRequest('GET','php/request.php/auth',callbackAuth,'login='+userName+'&password='+password);
    Cookies.set('login', login);

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
    //ajaxRequest('GET','/php/request.php/image/1',callback);
    //ajaxRequest('GET','/php/request.php/comment/1',callback);
}

function openImg(id){
    var modal = document.getElementById('myModal');
    var prev = document.getElementsByClassName("preview")[id];
    var span = document.getElementsByClassName("close")[0];
    var modalOrig=Object.assign({}, modal);

    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        var images = modal.getElementsByTagName('img');
        while(images.length > 0) {
            images[0].parentNode.removeChild(images[0]);
        }
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            var images = modal.getElementsByTagName('img');
            while(images.length > 0) {
                images[0].parentNode.removeChild(images[0]);
            }
            modal.style.display = "none";
        }
}

ajaxRequest('GET','/php/request.php/image/'+id,callbackOpenImg);
}
function callbackOpenImg(txt){
    var data = JSON.parse(txt);
    var id=data[0].id_photo;     
    var modal=$("#myModal").find("#modal-container");
    var path="img/large/img";
    modal.prepend($('<img>',{id:'largeimg',src:path+id+'.png'}));
    
    getComment(id);
}

function validateLogin(event)
{
  var login;
  var password;
  var text;
  var xhr;

  event.preventDefault();

  // Check login/password fields.
  login = $('#authUserName').val();
  password = $('#authPassword').val();
  $('#errors').html('');
  if (login == '' || password == '')
  {
    text = '<div id="errors" class="alert alert-danger" role="alert">';
    text += '<span class="glyphicon glyphicon-exclamation-sign"'
    text += ' aria-hidden="true"></span>';
    text += '<strong> L\'un des champs est vide.</strong></div>';
    $('#errors').html(text);
  }
  else
  {
    // Create login cookie.
    Cookies.set('login', login);

    // Create XML HTTP request.
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/request.php/auth', true);
    $.ajax({
        type: 'GET',
        url: "php/request.php/auth",
        data: {},
        crossDomain: true,
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent(login + ':' + password))))
        }
      });
    console.log(xhr);

    // Add the onload function.
    xhr.onload = function ()
    {
      switch (xhr.status)
      {
        case 200:
          Cookies.set('token', xhr.responseText);
          $("#authentication").hide();
          $('#infos').html('Authentification OK');
          break;
        default:
          httpErrors(xhr.status);
      }
    };

    // Send XML HTTP request.
    xhr.send();
  }
}
 
function httpErrors(errorNumber)
{
  var text;

  text = '<div class="alert alert-danger" role="alert">';
  text += '<span class="glyphicon glyphicon-exclamation-sign"></span>';
  switch (errorNumber)
  {
    case 400:
      // Bad request.
      text += '<strong> Requête incorrecte</strong>';
      break;
    case 401:
      // Unauthorized.
      text += '<strong> Authentifiez vous</strong>';
      break;
    case 403:
      // Forbidden.
      text += '<strong> Accès refusé</strong>';
      break;
    case 404:
      // Ressource not found.
      text += '<strong> Page non trouvée</strong>';
      break;
    case 500:
      // Internal server error.
      text += '<strong> Erreur interne du serveur</strong>';
      break;
    case 503:
      // Service unavailable.
      text += '<strong> Service indisponible</strong>';
      break;
    default:
      text += '<strong> HTTP erreur ' + errorNumber + '</strong>';
      break;
  }
  text += '</div>';
  $('#errors').html(text);
}