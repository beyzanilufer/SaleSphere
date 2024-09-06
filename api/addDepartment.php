<?php
include 'db.php';
global $connection;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $ID = !empty($data['ID']) ? $data['ID'] : null;
        $category = !empty($data['category']) ? $data['category'] : null;
        $maingroup = !empty($data['Main_Group']) ? $data['Main_Group'] : null;

        if ($ID) {

            $stmt = $connection->prepare("UPDATE department SET category = :category, group_id = :maingroup WHERE ID = :ID");
            $stmt->bindParam(':ID', $ID, PDO::PARAM_INT);
            $stmt->bindParam(':category', $category, PDO::PARAM_STR);
            $stmt->bindParam(':maingroup', $maingroup, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode(['message' => 'Department updated successfully']);
        } else {

            $stmt = $connection->prepare('INSERT INTO department (category, group_id) VALUES (:category, :maingroup)');
            $stmt->bindParam(':category', $category, PDO::PARAM_STR);
            $stmt->bindParam(':maingroup', $maingroup, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode(['message' => 'Department created successfully']);
        }
    } else {
        echo json_encode(['message' => 'Invalid request method']);
    }
} catch (PDOException $e) {
    echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    exit();
}
?>
