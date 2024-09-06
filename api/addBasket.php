<?php
include 'db.php';
global $connection;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $product_name = !empty($data['product_name']) ? $data['product_name'] : "";
        $product_id = !empty($data['ID']) ? $data['ID'] : "";
        $price = !empty($data['price']) ? $data['price'] : "";
        $quantity = !empty($data['quantity']) ? $data['quantity'] : "";
        $cartid = !empty($data['cartid']) ? $data['cartid'] : "";
        $total_price=!empty($data['total_price']) ? $data['total_price']: "";
        $barcode=!empty($data['barcode']) ? $data['barcode'] : "";

        $stmt = $connection->prepare("SELECT * FROM product_basket WHERE product_id = :product_id AND cartid=:cartid");
        $stmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
        $stmt->bindParam(':cartid', $product_id, PDO::PARAM_INT);
        $stmt->execute();
        $p_n = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($p_n) {

            $stmt = $connection->prepare("UPDATE product_basket SET quantity = :quantity,total_price=:total_price WHERE product_id = :product_id");
            $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
            $stmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
            $stmt->bindParam(':total_price', $total_price, PDO::PARAM_INT);

            $stmt->execute();

            echo json_encode(['message' => 'Product quantity updated successfully']);
        } else {

            $stmt = $connection->prepare("INSERT INTO product_basket (product_name, price, quantity, cartid,product_id,total_price,barcode) VALUES (:product_name, :price, :quantity, :cartid,:product_id,:total_price,:barcode)");
            $stmt->bindParam(':product_name', $product_name);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
            $stmt->bindParam(':cartid', $cartid, PDO::PARAM_INT);
            $stmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
            $stmt->bindParam(':total_price', $total_price, PDO::PARAM_INT);
            $stmt->bindParam(':barcode',$barcode,PDO::PARAM_INT);

            $stmt->execute();

            echo json_encode(['message' => 'Product added to cart successfully']);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
