<?php
require_once "connect.php";
date_default_timezone_set("Asia/Taipei"); //correct time

function Role($account){
    global $db_connect;
    $sql = "SELECT * 
            FROM `administrator`
            WHERE `Account` = '" . $account . "';";
    $result = $db_connect -> query($sql);
    if(!$result){
        return "failed";
    }
    else{
        if($row = $result -> fetch_assoc()){//admin
            return "admin";
        }
        else{
            $sql = "SELECT * 
                    FROM `game_manager`
                    WHERE `Account` = '" . $account . "';";
            $result = $db_connect -> query($sql);
            if(!$result){
                return "failed";
            }
            else{
                if($row = $result -> fetch_assoc()){//mgr
                    return "mgr";
                }
                    $sql = "SELECT * 
                            FROM `player`
                            WHERE `Account` = '" . $account . "';";
                    $result = $db_connect -> query($sql);
                    if(!$result){
                        return "failed";
                    }
                    else{
                        if($row = $result -> fetch_assoc()){//player
                            if($row['Unfreeze_date'] != null){//freeze
                                $now = date("Y-m-d H:i:s");
                                if(strtotime($now) > strtotime($row['Unfreeze_date'])){//unfrezze
                                    $sql = "UPDATE `player` 
                                            SET
                                            `Mgr_account` = null,
                                            `Freeze_date` = null,
                                            `Unfreeze_date` = null,
                                            `Reason` = null
                                            WHERE `Account` = '" . $account . "';";
                                    $result = $db_connect -> query($sql);
                                    if(!$result){
                                        return "failed" . $db_connect -> errno;
                                    }
                                    else{
                                        return "player";
                                    }
                                }
                                else{
                                    return "freeze";
                                }

                            }
                            else{
                                return "player";
                            }
                        }
                        else{
                            return "member"; //notset to any role
                        }
                    }
            }
        }
    }
}
?>
