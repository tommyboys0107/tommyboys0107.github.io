<?php
    require_once "connect.php";
    require_once "inputtest.php";

    $filters = array(
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

    if(empty($input["password"]) || empty($input["first_name"]) || empty($input["last_name"]) || empty($input["email"])){
        $outcome = "blank";
    }
    else if($input["password"] != $input["confirm"]){
        $outcome = "not_equal";
    }
    else if(!filter_var($input["email"], FILTER_VALIDATE_EMAIL)){
        $outcome = "not_valid";
    }
    else{ // good to add
        session_start();
        $sql = "UPDATE `member`
                SET
                `Password` = '" . $input["password"] . "',
                `First_name` = '" . $input["first_name"] . "',
                `Last_name` = '" . $input["last_name"] . "',
                `Nickname` = '" . $input["nickname"] . "',
                `Email` = '" . $input["email"] . "',
                `Birth` = '" . $input["birth"] . "',
                `Sex` = '". $input["sex"] . "'" .
                "WHERE `Account` = '" . $_SESSION["account"] . "';";
        $result = $db_connect -> query($sql);
        if(!$result){
            $outcome = "failed";
        }
        else{
            $outcome = "success";
        }
    }

    echo json_encode($outcome); //failed not_valid not_equal roll success blank repeat
?>
