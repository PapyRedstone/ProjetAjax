'use strict';

function httpError(errorCode){
    $("div#error").addClass("alert alert-danger");
    $("div#error").html(errorCode);
}

function ajaxRequest(type, request, callback, data = null){
    var xhr;

    xhr = new XMLHttpRequest();
    if(data != null){
	request += '?' + data;
    }
    xhr.open(type, request, true);
    
    xhr.onload = function(){
	switch(xhr.status){
	case 200:
	case 201:
	    callback(xhr.responseText);
	    break;
	    
	default:
	    httpError(xhr.status);
	    break;
	}
    }
    
    xhr.send(data);
}

