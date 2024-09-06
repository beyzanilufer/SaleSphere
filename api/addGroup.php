<?php
include 'db.php';
global $connection;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $grup_id = !empty($data['grup_id']) ? $data['grup_id'] : null;
        $name = !empty($data['name']) ? $data['name'] : null;
        $maingroup = !empty($data['Main_Group']) ? $data['Main_Group'] : null;

        if ($grup_id) {

            $stmt = $connection->prepare("UPDATE group_g SET name = :name, main_group_id = :maingroup WHERE grup_id = :grup_id");
            $stmt->bindParam(':grup_id', $grup_id, PDO::PARAM_INT);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':maingroup', $maingroup, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode(['message' => 'Group updated successfully']);
        } else {
            $stmt = $connection->prepare("INSERT INTO group_g (name, main_group_id) VALUES (:name, :maingroup)");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':maingroup', $maingroup, PDO::PARAM_INT);
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
