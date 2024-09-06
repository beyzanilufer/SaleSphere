<?php
include 'db.php';
global $connection;

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);


        $ID = !empty($data['ID']) ? $data['ID'] : null;
        $Company = !empty($data['Company']) ? $data['Company'] : "";
        $First_Name = !empty($data['First_Name']) ? $data['First_Name'] : "";
        $Last_Name = !empty($data['Last_Name']) ? $data['Last_Name'] : "";
        $Phone = !empty($data['Phone']) ? $data['Phone'] : "";
        $E_Mail = !empty($data['E_Mail']) ? $data['E_Mail'] : "";
        $Street = !empty($data['Street']) ? $data['Street'] : "";
        $House_Number = !empty($data['House_Number']) ? $data['House_Number'] : "";
        $City = !empty($data['City']) ? $data['City'] : "";
        $Area_Code = !empty($data['Area_Code']) ? $data['Area_Code'] : "";
        $Postcode = !empty($data['Postcode']) ? $data['Postcode'] : "";
        $Country = !empty($data['Country']) ? $data['Country'] : "";
        $Fax = !empty($data['Fax']) ? $data['Fax'] : "";

        if ($ID) {

            $stmt = $connection->prepare("UPDATE customers SET Company = :Company, First_Name = :First_Name, Last_Name = :Last_Name, Phone = :Phone, E_Mail = :E_Mail, Street = :Street, House_Number = :House_Number, City = :City, Area_Code = :Area_Code, Postcode = :Postcode, Country = :Country, Fax = :Fax WHERE ID = :ID");
            $stmt->bindParam(':Company', $Company);
            $stmt->bindParam(':First_Name', $First_Name);
            $stmt->bindParam(':Last_Name', $Last_Name);
            $stmt->bindParam(':Phone', $Phone);
            $stmt->bindParam(':E_Mail', $E_Mail);
            $stmt->bindParam(':Street', $Street);
            $stmt->bindParam(':House_Number', $House_Number);
            $stmt->bindParam(':City', $City);
            $stmt->bindParam(':Area_Code', $Area_Code);
            $stmt->bindParam(':Postcode', $Postcode);
            $stmt->bindParam(':Country', $Country);
            $stmt->bindParam(':Fax', $Fax);
            $stmt->bindParam(':ID', $ID);
            $stmt->execute();
            echo json_encode(['message' => 'User updated successfully']);
        } else {

            $stmt = $connection->prepare("INSERT INTO customers (Company, First_Name, Last_Name, Phone, E_Mail, Street, House_Number, City, Area_Code, Postcode, Country, Fax) VALUES (:Company, :First_Name, :Last_Name, :Phone, :E_Mail, :Street, :House_Number, :City, :Area_Code, :Postcode, :Country, :Fax)");
            $stmt->bindParam(':Company', $Company);
            $stmt->bindParam(':First_Name', $First_Name);
            $stmt->bindParam(':Last_Name', $Last_Name);
            $stmt->bindParam(':Phone', $Phone);
            $stmt->bindParam(':E_Mail', $E_Mail);
            $stmt->bindParam(':Street', $Street);
            $stmt->bindParam(':House_Number', $House_Number);
            $stmt->bindParam(':City', $City);
            $stmt->bindParam(':Area_Code', $Area_Code);
            $stmt->bindParam(':Postcode', $Postcode);
            $stmt->bindParam(':Country', $Country);
            $stmt->bindParam(':Fax', $Fax);
            $stmt->execute();
            echo json_encode(['message' => 'User created successfully']);
        }

    } else {
        echo json_encode(['message' => 'Invalid request method']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
