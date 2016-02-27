<?php
    require_once "connect.php";

    session_start();
    $account = $_SESSION["account"];

    $sql = "SELECT *
            FROM `game`;";
            

    $result = $db_connect -> query($sql);
    if(!$result){
        $row = "failed";
    }
    else{

        while($row = $result -> fetch_assoc()){            
                 $rows .= json_encode($row);
        }   
    }
    
    echo $rows;
?>
