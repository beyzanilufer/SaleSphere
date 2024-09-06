<?php
include 'db.php';
global $connection;

header('Content-Type: application/json'); // JSON formatında veri döndürüleceğini belirtir



try {
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $cartid = !empty($data['cartid']) ? $data['cartid'] : "";



        $stmt=$connection->prepare("SELECT 
        ROW_NUMBER() OVER (ORDER BY articles.ID DESC) AS unique_id,
        articles.ID, articles.barcode, articles.product_name, articles.tax_rate, articles.price, 
        group_g.`name` AS group_name,
        department.category AS department_name,
        CASE
            WHEN product_basket.quantity IS NULL THEN 0
            ELSE product_basket.quantity
        END AS quantity,
    
        product_basket.cartid
        FROM articles 
        LEFT JOIN department ON articles.department_id = department.ID
        LEFT JOIN group_g ON department.group_id = group_g.grup_id
        LEFT JOIN product_basket ON product_basket.product_id = articles.ID AND product_basket.cartid = :cartid
        WHERE (product_basket.cartid = :cartid OR product_basket.cartid IS NULL)
        GROUP BY articles.ID
        ORDER BY articles.ID DESC ;");
        $stmt->bindParam(':cartid', $cartid, PDO::PARAM_INT);

        // Sorguyu çalıştır
        $stmt->execute();


        // Sonuçları al
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // JSON olarak döndür
        echo json_encode($result);
    }


}catch (PDOException $e){
    echo $e->getMessage();
    exit();
}







?>