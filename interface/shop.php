<?php
    include('./conn.php');

    $sid= $_REQUEST['sid'];

    $sql = "select * from registe where id in ($sid)";

    $res = $mysqli->query($sql);

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;

    $mysqli->close();
?>