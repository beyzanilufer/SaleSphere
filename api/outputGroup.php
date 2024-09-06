<?php
include 'db.php';
global $connection;

header('Content-Type: application/json'); // JSON formatında veri döndürüleceğini belirtir



try {
    $stmt=$connection->query("SELECT * FROM group_g ORDER BY grup_id DESC");
    $data=$stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);


}catch (PDOException $e){
    echo $e->getMessage();
    exit();
}







?>