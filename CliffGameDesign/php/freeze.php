<?php
    require_once "connect.php";
    require_once "inputtest.php";
    date_default_timezone_set("Asia/Taipei"); //orrect time

    $reason = $_POST["reason"];
    $reason = filter_var($reason, FILTER_SANITIZE_STRING);
    $reason = $db_connect -> real_escape_string($reason);
    $reason = InputTest($reason);

    if(empty($_POST["reason"])){
        $outcome = "blank";
    }
    else{// good to sql
        session_start();
        $sql = "UPDATE `player`
                SET 
                `Mgr_account` = '" . $_SESSION["account"] . "',
                `Freeze_date` = '" . date('Y-m-d H:i:s') . "',
                `Unfreeze_date` = '" . $_POST["unfreeze_date"] . "',
                `Reason` = '" . $reason . "'" .
                "WHERE `Account` = '" . $_POST["account"] . "';";

        $result = $db_connect -> query($sql);
        if(!$result){
            $outcome = "failed";
        }
        else{
            $outcome = "success";
        }
    }

    echo $outcome;
?>
