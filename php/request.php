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
       echo json_encode($db->execute("SELECT pathLarge FROM images WHERE id_photo = ".$requestRessourceNumber));
     }else{
       echo json_encode($db->execute("SELECT pathSmall FROM images"));
     }
     exit();
     break;

   case "comment":
     header('HTTP/1.1 200 OK');
     echo json_encode($db->execute("SELECT c.text,u.userName FROM comment as c,user as u WHERE c.id_user = u.id_user AND c.id_photo = $requestRessourceNumber"));
     exit();
     break;

   default:
     header('HTTP/1.1 501 Not Implemented');
     exit();
   }
   break;

 case "PUT":
   parse_str(file_get_contents("php://input"),$_PUT);
   switch($requestRessource){
   case "comment":
     header('HTTP/1.1 200 OK');
     $data[] = $_PUT["text"];
     $data[] = $_PUT["login"];
     $data[] = $requestRessourceNumber;
     var_dump($data);
     echo $db->execute("UPDATE comment as c, user as u SET c.text = ? WHERE u.userName = ?' AND c.id_user = u.id_user AND c.id_comment = ?",$data);
     //echo $db->execute("UPDATE comment as c, user as u SET c.text = 'SLT' WHERE u.userName = 'alex' AND c.id_user = u.id_user AND c.id_comment = 1");
     /*
     var_dump($_PUT);
     echo $requestRessourceNumber;
     $result = $db->execute("SELECT * FROM user as u,comment as c WHERE c.id_user = u.id_user AND u.userName = ".$_PUT['alex']);*/
     exit();
     break;
   }
   break;
}

header('HTTP/1.1 501 Not Implemented');
//header('HTTP/1.1 200 OK');
exit();
?>
