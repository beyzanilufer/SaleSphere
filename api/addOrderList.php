<?php
include 'db.php';
global $connection;

try {
    date_default_timezone_set('Etc/GMT-3'); // Zaman dilimini ayarla
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        var_dump($data); // Veriyi inceleyin
        $cartid = !empty($data['cartid']) ? $data['cartid'] : "";

        // Günün tarihini ve saatini al
        $date = date('Y-m-d H:i:s'); // Veritabanında genellikle bu format kullanılır

        $total_price = !empty($data['total_price']) ? $data['total_price'] : "";



        // Prepared statement kullanarak SQL enjeksiyon saldırılarına karşı koruma sağlıyoruz
        $stmt = $connection->query("INSERT INTO order_list (customer_id, date, totalprice) VALUES ('$cartid', '$date','$total_price')");
        $test=$stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['message' => 'Order successfully created']);

    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
