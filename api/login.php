<?php
include 'db.php';
global $connection;

try {
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $username = !empty($data['username']) ? $data['username'] : "";
        $password = !empty($data['password'])  ? $data['password'] : "";


        $user=$connection->query("SELECT * FROM users WHERE username='$username'");
        $user = $user->fetchAll(PDO::FETCH_ASSOC);

        $pw=$connection->query("SELECT * FROM users WHERE password='$password'");
        $pw=$pw->fetchAll(PDO::FETCH_ASSOC);

        if($user && $pw){

            echo json_encode([
                'success'=>true,
                'message'=>'The entry was successful']);
        }else{
            echo json_encode(['message'=>'The username or password is not correct']);
        }


    }


}catch (PDOException $e){
    echo $e->getMessage();
    exit();
}


?>




