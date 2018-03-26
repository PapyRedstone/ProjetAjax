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
error_log("".$requestRessourceNumber);

switch($requestType){
 case "GET":
   header('HTTP/1.1 200 OK');
   switch($requestRessource){
   case "chat":
     echo json_encode($db->execute("SELECT c.text,u.userName FROM chat as c, user as u WHERE u.id_user = c.id_user"));

   case "image":
     //var_dump($requestRessourceNumber);
     if(isset($requestRessourceNumber)){
       echo json_encode($db->execute("SELECT pathLarge FROM image WHERE id = $requestRessourceNumber"));
     }else{
       echo json_encode($db->execute("SELECT pathSmall FROM image"));
     }
   }
   exit();
}

header('HTTP/1.1 501 Not Implemented');
exit();
?>
