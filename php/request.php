<?php
header('Content-Type: text/plain; charset=utf-8');
header('Cache-control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');

require "database.php";
$db = new DataBase();
if(!$db->getDB()){
  header('HTTP/1.1 503 Service Unavailable');
  exit();
}

$requestType = $_SERVER['REQUEST_METHOD'];
$request = substr($_SERVER['PATH_INFO'], 1);
$request = explode('/', $request);
$requestRessource = array_shift($request);
$requestRessourceNumber = array_shift($request);

switch($requestType){
 case "GET":
   switch($requestRessource){
   case "image":
     header('HTTP/1.1 200 OK');
     if(isset($requestRessourceNumber)){
       echo json_encode($db->execute("SELECT * FROM images WHERE id_photo = ".$requestRessourceNumber));
     }else{
       echo json_encode($db->execute("SELECT id_photo FROM images"));
     }
     exit();
     break;

   case "comment":
     header('HTTP/1.1 200 OK');
     echo json_encode($db->execute("SELECT c.id_comment,c.text,u.userName FROM comment as c,user as u WHERE c.id_user = u.id_user AND c.id_photo = $requestRessourceNumber"));
     exit();
     break;

   case "auth":
   session_start();
     //$st=$db->getDB->prepare("SELECT * from user WHERE userName = '".$_GET['login']."' AND password = '".$_GET['password']."'");
     $st=$db->execute("select COUNT(*) from user where userName='cir' and password='cir'");
     print_r($_GET);
     if($st){
       $_SESSION["username"]=$_GET['login'];
      header('HTTP/1.1 200 OK');
     }else{
      
      header('HTTP/1.1 401 Unauthorized'); 
     }
     exit();
     break;
   }
   break;

 case "PUT":
   parse_str(file_get_contents("php://input"),$_PUT);
   switch($requestRessource){
   case "comment":
     header('HTTP/1.1 200 OK');
     $db->execute("UPDATE comment as c, user as u SET c.text = :text WHERE u.userName = :login AND c.id_user = u.id_user AND c.id_comment = :com",array('text'=>$_PUT['text'],'login'=>$_PUT['login'],'com'=>$requestRessourceNumber));
     exit();
     break;
   }
   break;

 case "POST":
   switch($requestRessource){
   case "comment":
     header('HTTP/1.1 200 OK');
     $r = $db->execute("SELECT * FROM user WHERE userName = '".$_POST['login']."'")[0];
     $db->execute('INSERT INTO comment VALUES (NULL, :text, :idU, :idp)',array('text'=>$_POST['text'],'idU'=>$r['id_user'],'idp'=>$_POST['id_photo']));
     exit();
     break;

   case "user":
     header('HTTP/1.1 200 OK');
     $db->execute('INSERT INTO user VALUES (NULL, :name, :pass)',array('name'=>$_POST['login'],'pass'=>$_POST['password']));
     exit();
     break;
   }
   break;

 case 'DELETE':
   $_DELETE = $_GET;
   switch($requestRessource){
   case "comment":
     header('HTTP/1.1 200 OK');
     $r = $db->execute("SELECT c.id_comment FROM user as u, comment as c WHERE u.userName = '".$_DELETE['login']."' AND c.id_user = u.id_user");
     foreach($r as $table){
       if($requestRessourceNumber == $table['id_comment']){
         $db->execute("DELETE FROM comment WHERE id_comment = :id",array('id'=>$table['id_comment']));
       }
     }
     exit();
     break;

   case "user":
     header('HTTP/1.1 200 OK');
     $r = $db->execute("SELECT c.id_comment FROM user as u, comment as c WHERE u.userName = '".$_DELETE['login']."' AND c.id_user = u.id_user");
     foreach($r as $table){
       $db->execute("DELETE FROM comment WHERE id_comment = :id",array('id'=>$table['id_comment']));
     }
     $db->execute("DELETE FROM user WHERE userName = :name",array('name'=>$_DELETE['login']));     
     exit();
     break;
   }
   break;
}

header('HTTP/1.1 501 Not Implemented');
//header('HTTP/1.1 200 OK');
exit();
?>
