<?php
include 'db.php';
global $connection;

header('Content-Type: application/json'); // JSON formatında veri döndürüleceğini belirtir



try {
//    $stmt=$connection->query("SELECT * FROM articles ORDER BY ID DESC");
    $stmt=$connection->query("SELECT 
    ROW_NUMBER() OVER (ORDER BY articles.ID DESC) AS unique_id,
articles.ID, articles.barcode, articles.product_name, articles.tax_rate,articles.price, 
group_g.`name` AS group_name,
department.category AS department_name,
'0' AS quantity

FROM articles 

LEFT JOIN department ON articles.department_id = department.ID
LEFT JOIN group_g ON department.group_id = group_g.grup_id

ORDER BY articles.ID DESC");
    $data=$stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);


}catch (PDOException $e){
    echo $e->getMessage();
    exit();
}







?>