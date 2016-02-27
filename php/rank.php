<?php
    require_once "connect.php";

    $sql = "SELECT *
            FROM    `vicious_spiral_stage`
            ORDER BY 'Score', 'Mode' DESC  ; ";
    $result = $db_connect -> query($sql);
    if(!$result){
        echo "falied";
    }
    else{
        echo "<table border : 1>
            <tr>
            <th>Account</th>
            <th>Player name</th>
            <th>Mode</th>
            <th>Area</th>
            <th>Mission</th>
            <th>State</th>
            <th>Score</th>
            <th>Rank</th>
            <th>Exploit</th>
            </tr>";

        while($row = $result -> fetch_assoc()){
            echo "<tr>
                <td>" . $row["Account"] . "</td>
                <td>" . $row["Player_name"] . "</td>
                <td>" . $row["Mode"] . "</td>
                <td>" . $row["Area_num"] . "</td>
                <td>" . $row["Mission_num"] . "</td>
                <td>" . $row["State"] . "</td>
                <td>" . $row["Score"] . "</td>
                <td>" . $row["Rank"] . "</td>
                <td>" . $row["Exploit"] . "</td>
                </tr>";
        }
        echo "</table>";
    }

?>
