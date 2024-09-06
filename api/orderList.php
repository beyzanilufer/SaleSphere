<?php
include 'db.php';
global $connection;

header('Content-Type: application/json'); // JSON formatında veri döndürüleceğini belirtir



try {
    $stmt=$connection->query("SELECT 
    customers.Company, 
    cart.*, 
   
    ROW_NUMBER() OVER (ORDER BY cart.ID) AS uniq_id
FROM 
    customers
INNER JOIN 
    cart ON customers.ID = cart.customer_id
ORDER BY 
    cart.ID DESC;

");
    $data=$stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);


}catch (PDOException $e){
    echo $e->getMessage();
    exit();
}







?>