<?php
include 'db.php';
global $connection;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // JSON verisini al ve ayrıştır
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);




        $totalPrice = !empty($data['totalPrice']) ? $data['totalPrice'] : "";
        $cartid = !empty($data['cartid']) ? $data['cartid'] : "";




        // Sepeti güncelle
        $stmt = $connection->prepare("UPDATE cart SET totalPrice = :totalPrice WHERE ID = :cartid");
        $stmt->bindParam(':totalPrice', $totalPrice, PDO::PARAM_STR);
        $stmt->bindParam(':cartid', $cartid, PDO::PARAM_INT);

        $result = $stmt->execute();


    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
