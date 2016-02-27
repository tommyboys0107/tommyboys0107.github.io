<?php
    require_once "connect.php";
    date_default_timezone_set("Asia/Taipei");//correct time
    
    $result = $db_connect -> query($_POST["sql"]);
    if(!$result){
        echo "failed with error " . $db_connect -> errno;
    }
    else{
        echo "Success affect " . $db_connect -> affected_rows;
        while($row = $result -> fetch_assoc()){
            foreach($row as $key => $value){
                echo "\n" . $key . " => " . $value;
            }
            echo "\n------------------------------------------";
        }
    }


?>
