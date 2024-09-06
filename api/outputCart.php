<?php
include 'db.php';
global $connection;

header('Content-Type: application/json'); // JSON formatında veri döndürüleceğini belirtir

try {
    // Son eklenen kaydın ID'sini almak için SQL sorgusu
    $stmt = $connection->query("
        SELECT 
            ID
        FROM 
            cart
        ORDER BY 
            ID DESC
        LIMIT 1
    ");

    // Veriyi al
    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    // JSON formatında çıktı ver
    echo json_encode($data);

} catch (PDOException $e) {
    // Hata mesajını JSON formatında döndür
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
