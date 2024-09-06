<?php
include 'db.php';
global $connection;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $username = !empty($data['username']) ? $data['username'] : "";
        $password = !empty($data['password'])  ? $data['password'] : "";

        $user=$connection->query("SELECT * FROM users WHERE username='$username'");
        $user = $user->fetchAll(PDO::FETCH_ASSOC);

        if($user){

            echo json_encode([ 'message'=>'This username has been used']);
            die();
        }else{
            $oku = $connection->query("INSERT INTO users (username, password) VALUES ('$username','$password')");
            $test = $oku->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['message'=>'User created susscessfully']);
        }
    }
} catch (PDOException $e) {
    echo $e->getMessage();
    exit();
}
?>



