<?php
    $db_IP      = "127.0.0.1";
    $db_username= "Cliff";
    $db_password= "820107";
    $db_name    = "cliff_game_design";

    $db_connect = new mysqli($db_IP, $db_username, $db_password, $db_name);

    if($db_connect -> connect_errno){
        die('Could not connect:'. $db_connect -> connect_errno);
    }

    //echo $db_connect -> host_info . "\n";

    mysql_query("SET NAMES utf8", $db_connect);
    mysql_query("SET CHARACTER_SET_CLIENT = utf8", $db_connect);
    mysql_query("SET CHARACTER_SET_RESULTS = utf8", $db_connect);
?>
