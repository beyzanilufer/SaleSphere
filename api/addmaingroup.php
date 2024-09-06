<?php
include 'db.php';
global $connection;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $ID = !empty($data['ID']) ? $data['ID'] : null;
        $group_name = !empty($data['group_name']) ? $data['group_name'] : null;

        if ($ID) {
            // Update
            $stmt = $connection->prepare("UPDATE main_groups SET group_name = :group_name WHERE ID = :ID");
            $stmt->bindParam(':group_name', $group_name);
            $stmt->bindParam(':ID', $ID, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode(['message' => 'Group updated successfully']);
        } else {
            // Insert
            $stmt = $connection->prepare("INSERT INTO main_groups (group_name) VALUES (:group_name)");
            $stmt->bindParam(':group_name', $group_name);
            $stmt->execute();

            echo json_encode(['message' => 'Group created successfully']);
        }
    } else {
        echo json_encode(['message' => 'Invalid request method']);
    }
} catch (PDOException $e) {
    echo json_encode(['message' => $e->getMessage()]);
    exit();
}
?>
