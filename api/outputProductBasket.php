<?php
include 'db.php';
global $connection;

header('Content-Type: application/json'); // JSON formatında veri döndürüleceğini belirtir

try {
    // GET parametresini al
    $cartid = isset($_GET['cartid']) ? $_GET['cartid'] : '';

    if (empty($cartid)) {
        throw new Exception('Cart ID is missing.');
    }

    $stmt = $connection->prepare("SELECT * FROM product_basket WHERE cartid = :cartid ORDER BY ID DESC");
    $stmt->bindParam(':cartid', $cartid, PDO::PARAM_INT);
    $stmt->execute();

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
