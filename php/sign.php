<?php
    require_once "connect.php";
    require_once "inputtest.php";

    $filters = array(
        "account" => FILTER_SANITIZE_STRING,
        "password" => FILTER_SANITIZE_STRING,
        "confirm" => FILTER_SANITIZE_STRING,
        "first_name" => FILTER_SANITIZE_STRING,
        "last_name" => FILTER_SANITIZE_STRING,
        "nickname" => FILTER_SANITIZE_STRING,
        "email" => FILTER_SANITIZE_EMAIL,
        "sex" => FILTER_SANITIZE_STRING,
        "birth" => FILTER_SANITIZE_STRING,
    );

    $input = filter_input_array(INPUT_POST, $filters);
    foreach($input as &$value){
        $value = $db_connect -> real_escape_string($value);
        $value = InputTest($value);
    }

    if(empty($input["account"]) || empty($input["password"]) || empty($input["first_name"]) || empty($input["last_name"]) || empty($input["email"])){
        $outcome = "blank";
    }
    else if($input["password"] != $input["confirm"]){
        $outcome = "not_equal";
    }
    else if(!filter_var($input["email"], FILTER_VALIDATE_EMAIL)){
        $outcome = "not_valid";
    }
    else{ // good to add
        $sql = "SELECT * 
                FROM `member`
                WHERE `Account` = '" . $input["account"] . "';";
        $result = $db_connect -> query($sql);
        if(!$result){
            $outcome = "failed";
        }
        else{
            if($row = $result -> fetch_assoc()){
                $outcome = "repeat";
            }
            else{
                $db_connect -> query("SET AUTOCOMMIT=0");
                $db_connect -> query("START TRANSACTION");

                $sql1 = "INSERT INTO `member`
                    (`Account`, 
                    `Password`, 
                    `First_name`, 
                    `Last_name`, 
                    `Nickname`,
                    `Email`,
                    `Birth`,
                    `Sex`)
                    VALUES
                    ('" . $input["account"] . "'," .
                    "'" . $input["password"] . "'," .
                    "'" . $input["first_name"] . "'," .
                    "'" . $input["last_name"] . "'," .
                    "'" . $input["nick_name"] . "'," .
                    "'" . $input["email"] . "'," .
                    "'" . $input["birth"] . "'," .
                    "'" . $input["sex"] . "');";
                $sql2 = "INSERT INTO `player`
                        (`Account`)
                        VALUES
                        ('" . $input["account"] . "');";

                $r1 = $db_connect -> query($sql1);
                $r2 = $db_connect -> query($sql2);
                if($r1 && $r2){
                    $db_connect -> query("COMMIT");
                    $db_connect -> query("SET AUTOCOMMIT=1");
                    $outcome = "success";
                }
                else{
                    $db_connect -> query("ROLLBACK");
                    $db_connect -> query("SET AUTOCOMMIT=1");
                    $outcome = "roll";
                }

            }
        }
    }

    echo json_encode($outcome); //failed not_valid not_equal roll success blank repeat
?>
