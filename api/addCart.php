<?php
include 'db.php';
global $connection;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $ID = !empty($data['ID']) ? $data['ID'] : "";

        $cartid=!empty($data['cartid']) ? $data['cartid'] : "";
        $totalPrice=!empty($data['totalPrice']) ? $data['totalPrice'] : "";
        // Geçerli tarih ve saati al
        $current_date = date('Y-m-d H:i:s');

        $stmt=$connection->prepare("SELECT * FROM cart Where ID=:cartid");
        $stmt->bindParam(':cartid',$cartid,PDO::FETCH_ASSOC);
        $stmt->execute();
        $c_i=$stmt->fetch(PDO::FETCH_ASSOC);

        if($c_i){
            $stmt = $connection->prepare("UPDATE cart SET totalPrice=:totalPrice WHERE ID=:cartid");
            $stmt->bindParam(':totalPrice',$totalPrice,PDO::FETCH_ASSOC);
            $stmt->bindParam(':cartid', $cartid, PDO::PARAM_INT);
            $stmt->execute();
        }else{
            // Prepare and execute the INSERT statement
            $stmt = $connection->prepare("INSERT INTO cart (customer_id,date) VALUES (:customer_id,:date)");
            $stmt->bindParam(':customer_id', $ID);
            $stmt->bindParam(':date', $current_date);
            $stmt->execute();

            // Get the last inserted ID
            $lastInsertId = $connection->lastInsertId();
            // Return the last inserted ID in the response
            echo json_encode([
                'message' => 'User created successfully',
                'last_insert_id' => $lastInsertId
            ]);

            exit();

        }




    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
