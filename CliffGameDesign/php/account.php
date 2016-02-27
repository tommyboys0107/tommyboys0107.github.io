<?php
    require_once "connect.php";
    
    $sql = "SELECT `Account`
            FROM `player`;";

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
