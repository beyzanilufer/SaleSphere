<?php
include 'db.php';
global $connection;

header('Content-Type: application/json'); // JSON formatında veri döndürüleceğini belirtir

try {

    $stmt = $connection->query("
        SELECT 
    customers.Company, 
     product_basket.quantity,
    cart.*, 
   
    ROW_NUMBER() OVER (ORDER BY cart.ID) AS uniq_id
FROM 
    customers
INNER JOIN 
    cart ON customers.ID = cart.customer_id
    INNER JOIN 
    product_basket ON cart.ID=product_basket.cartid
    GROUP BY cart.ID
ORDER BY 
    cart.ID DESC;");


    $data = $stmt->fetchAll(PDO::FETCH_ASSOC); // Tüm verileri al

    echo json_encode($data);

} catch (PDOException $e) {

    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
