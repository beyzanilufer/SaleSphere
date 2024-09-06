<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

$connection=new PDO("mysql:host=localhost;dbname=web;charset=utf8","root","");

?>