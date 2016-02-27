<?php
    require_once "connect.php";
    date_default_timezone_set("Asia/Taipei");//correct time

    //game data search first
    session_start();
    $sql = "SELECT `Account`, `Player_name`
            FROM `vicious_spiral_player`
            WHERE `Account` = '" . $_SESSION["account"] . "'AND
                  `Player_name` = '" . $_SESSION["account"] . "';";
    $result = $db_connect -> query($sql);
    if(!$result){
        $outcome = "failed1";
    }
    else{
        if($row = $result -> fetch_assoc()){
            $outcome = "exist1";
        }
        else{//nodata
            session_start();
            $sql = "INSERT INTO `vicious_spiral_player`
                    (`Account`,
                    `Player_name`,
                    `Stroy_difficulty`)
                    VALUES
                    ('" . $_SESSION["account"] . "'," .
                    "'". $_SESSION["account"] . "'," .
                    "0);";
            $result = $db_connect -> query($sql);
            if(!$result){
                $outcome = "failed1";
            }
            else{
                $outcome = "success1";
            }
        }
    }
    
    //play record
    session_start();
    $sql = "SELECT *
            FROM `played`
            WHERE `Account` = '" . $_SESSION["account"] . "'" .
            "AND `Game_name` = 'Vicious spiral';";
    $result = $db_connect -> query($sql);
    if(!$result){
        $outcome = "failed2";
    }
    else{
        if($row = $result -> fetch_assoc()){
            session_start();
            $sql = "UPDATE `played`
                    SET
                    `Last_played_time` = '" . date('Y-m-d H:i:s') . "'".
                    "WHERE `Account` = '" . $_SESSION["account"] . "'" .
                    "AND `Game_name` = 'Vicious spiral';";
            $result = $db_connect -> query($sql);
            if(!$result){
                $outcome = "failed2";
            }
            else{
                $outcome = "update2";
            }
        }
        else{ //nodata
            session_start();
            $sql = "INSERT INTO `played`
                    (`Account`,
                    `Game_name`,
                    `Last_played_time`)
                    VALUES
                    ('" . $_SESSION["account"] . "',
                    'Vicious spiral',
                    '" . date('Y-m-d H:i:s') . "');";
            $result = $db_connect -> query($sql);
            if(!$result){
                $outcome = "failed2";
            }
            else{
                $outcome = "success2";
            }
        } 
    }
    
    echo $outcome;
?>
