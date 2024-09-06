<?php
include 'db.php';
global $connection;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $name = !empty($data['name']) ? $data['name'] : "";
        $maingroup = !empty($data['Main_Group']) ? $data['Main_Group'] : "";


        $oku = $connection->query("INSERT INTO group_g (name,main_group_id) VALUES ('$name','$maingroup')");
        $test = $oku->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['message'=>'User created susscessfully']);

    }
} catch (PDOException $e) {
    echo $e->getMessage();
    exit();
}
?>

