<?php
    require_once "connect.php";

    session_start();
    $account = $_SESSION["account"];

    $sql = "SELECT *
            FROM `member`
            WHERE `Account` = '" . $account . "';";

    $result = $db_connect -> query($sql);
    if(!$result){
        $row = "failed";
    }
    else{
        $row = $result -> fetch_assoc();
    }

    echo json_encode($row);
?>
