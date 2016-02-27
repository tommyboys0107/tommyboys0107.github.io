<?php
    require_once "connect.php";         //$db_connect
    require_once "inputtest.php";
    require_once "role.php";
    //$account = $_POST["account"];
    //$password = $_POST["password"];
    if(!is_null($_POST["account"])){// through form
        $filters = array(
            "account" => FILTER_SANITIZE_STRING,
            "password" => FILTER_SANITIZE_STRING
        );
        $input = filter_input_array(INPUT_POST, $filters);
        foreach($input as $key => &$value){
            $value = $db_connect -> real_escape_string($value);
            $value = InputTest($value);
        }
        $sql = "SELECT * 
                FROM `member`
                WHERE `Account` = '" . $input["account"] .
                "' AND `Password` = '". $input["password"] ."';";
    }
    else{
        session_start(); 
        $sql = "SELECT * 
                FROM `member`
                WHERE `Account` = '" . $_SESSION["account"] ."';";
    }
    //echo $sql;
    $result = $db_connect -> query($sql);
    if(!$result){
        $outcome = "failed";
        //echo "Failed " . $db_connect -> errno;    
    }
    else{
        if($row = $result -> fetch_assoc()){//have data
            if(!is_null($_POST["account"])){
                session_start();
                $_SESSION["account"] = $row["Account"];
                $outcome = Role($input["account"]);
            }
            else{ //which role he is.
                $outcome = Role($_SESSION["account"]);
            }

            //echo $row["Account"] . $row["Password"];
            //echo "<br /> login success";
        }
        else{   
            $outcome = "nodata";
        }
    }
    echo json_encode($outcome);  //failed nodata member player freeze mgr admin
    //var_dump(json_decode(json_encode($outcome)));
    
?>
