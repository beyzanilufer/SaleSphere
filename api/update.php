<?php
include 'db.php';
global $connection;


try {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $username = !empty($data['username']) ? $data['username'] : "";
        $oldpassword = !empty($data['oldpassword']) ? $data['oldpassword'] : "";
        $password = !empty($data['newpassword']) ? $data['newpassword'] : "";
        $newpasswordtwo=!empty($data['newpasswordtwo']) ? $data['newpasswordtwo'] : "";

        $oldpasswordquery=$connection->query("SELECT * FROM users WHERE username='$username' AND password='$oldpassword'");
        $oldpasswordstmt = $oldpasswordquery->fetchAll(PDO::FETCH_ASSOC);
        if($oldpasswordstmt){
            if($password==$newpasswordtwo){
                $sorgu = $connection->query("UPDATE users SET password = '$password' WHERE username='$username'");

                $test = $sorgu->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode(['message' => 'User update password']);

            }else{
                echo json_encode(['message'=>'password does not match']);
                exit();
            }
        }else{
            echo json_encode(['message'=>'old password is incorrect']);
            exit();
        }






    }

}catch (PDOException $e){

    echo $e->getMessage();
    exit();

}



?>