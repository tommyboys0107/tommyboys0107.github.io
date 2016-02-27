<?php
    require_once "connect.php";

    $filters = array(
        "mode" => FILTER_SANITIZE_STRING,
        "area" => FILTER_VALIDATE_INT,
        "mission" => FILTER_VALIDATE_INT,
        "state" =>  FILTER_SANITIZE_STRING,
        "rank" =>  FILTER_SANITIZE_STRING,
        "score" => FILTER_VALIDATE_INT,
        "exploit" => FILTER_VALIDATE_INT
    );

    $input = filter_input_array(INPUT_POST, $filters);
    if(!$input["score"] || !$input["exploit"]){
        $outcome = "not_valid";
    }
    else{//good to query
        //seach first
        session_start();
        $sql = "SELECT *
                FROM `vicious_spiral_stage` 
                WHERE `Account` = '" . $_SESSION["account"] . "'
                AND `Player_name` = '" . $_SESSION["account"] . "'
                AND `Mode` = '" . $_POST["mode"] . "'
                AND `Area_num` = " . $_POST["area"] . "
                AND `Mission_num` = " . $_POST["mission"] . "
                AND `State` = '" . $_POST["state"] . "'
                AND `Score` = " . $_POST["score"] . "
                AND `Rank` = '" . $_POST["rank"] . "'
                AND `Exploit` = " . $_POST["exploit"] . ";";
        
        $result = $db_connect -> query($sql);
        if(!$result){
            $outcome = "failed1";
        }
        else{
            if($row = $result -> fetch_assoc()){
                $outcome = "repeat";
            }
            else{//nodata
                //insert
                session_start();
                $sql = "INSERT INTO `vicious_spiral_stage`
                        (`Account`,
                        `Player_name`,
                        `Mode`,
                        `Area_num`,
                        `Mission_num`,
                        `State`,
                        `Score`,
                        `Rank`,
                        `Exploit`)
                        VALUES(
                         '" . $_SESSION["account"] . "',
                         '" . $_SESSION["account"] . "',
                         '" . $_POST["mode"] . "',
                          " . $_POST["area"] . ",
                          " . $_POST["mission"] . ",
                         '" . $_POST["state"] . "',
                          " . $_POST["score"] . ",
                         '" . $_POST["rank"] . "',
                          " . $_POST["exploit"] . ");";

                $result = $db_connect -> query($sql);
                if(!$result){
                    $outcome = "failed";
                }
                else{
                    $outcome = "success";
                }
            }
        }
    }
    
    echo $outcome;
?>
