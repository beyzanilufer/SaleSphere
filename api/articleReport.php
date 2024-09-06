<?php
include 'db.php';
global $connection;


header('Content-Type: application/json'); // JSON formatında veri döndürüleceğini belirtir


try {
    $stmt=$connection->query("SELECT 
    customers.Company, 
    product_basket.*, 
    ROW_NUMBER() OVER (ORDER BY product_basket.ID DESC) AS uniq_id
FROM 
    customers
INNER JOIN 
    cart ON customers.ID = cart.customer_id
INNER JOIN 
    product_basket ON cart.ID = product_basket.cartid;

");

    $data=$stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);


}catch (PDOException $e){
    echo $e->getMessage();
    exit();
}





?>