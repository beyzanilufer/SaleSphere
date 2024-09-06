<?php
include 'db.php';
global $connection;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $ID = !empty($data['ID']) ? $data['ID'] : null;
        $barcode = !empty($data['barcode']) ? $data['barcode'] : null;
        $product_name = !empty($data['product_name']) ? $data['product_name'] : null;
        $departmentgroup = !empty($data['Department_Category']) ? $data['Department_Category'] : null;
        $tax_rate = !empty($data['tax_rate']) ? $data['tax_rate'] : null;
        $price = !empty($data['price']) ? $data['price'] : null;

        if ($ID) {

            $stmt = $connection->prepare("UPDATE articles SET barcode = :barcode, product_name = :product_name, department_id = :departmentgroup, tax_rate = :tax_rate, price = :price WHERE ID = :ID");
            $stmt->bindParam(':ID', $ID, PDO::PARAM_INT);
            $stmt->bindParam(':barcode', $barcode, PDO::PARAM_STR);
            $stmt->bindParam(':product_name', $product_name, PDO::PARAM_STR);
            $stmt->bindParam(':departmentgroup', $departmentgroup, PDO::PARAM_INT);
            $stmt->bindParam(':tax_rate', $tax_rate, PDO::PARAM_STR);
            $stmt->bindParam(':price', $price, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode(['message' => 'Article updated successfully']);
        } else {

            $stmt = $connection->prepare('INSERT INTO articles (barcode, product_name, department_id, tax_rate, price) VALUES (:barcode, :product_name, :departmentgroup, :tax_rate, :price)');
            $stmt->bindParam(':barcode', $barcode, PDO::PARAM_STR);
            $stmt->bindParam(':product_name', $product_name, PDO::PARAM_STR);
            $stmt->bindParam(':departmentgroup', $departmentgroup, PDO::PARAM_INT);
            $stmt->bindParam(':tax_rate', $tax_rate, PDO::PARAM_STR);
            $stmt->bindParam(':price', $price, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode(['message' => 'Article created successfully']);
        }
    } else {
        echo json_encode(['message' => 'Invalid request method']);
    }
} catch (PDOException $e) {
    echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    exit();
}
?>
