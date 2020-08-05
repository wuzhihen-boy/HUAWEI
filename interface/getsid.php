<?php

header('Access-Control-Allow-Origin:*');

header('Access-Control-Allow-Method:POST,GET');
    include('./conn.php');

    $sid = $_REQUEST['sid'];

    $sql = "select * from register where sid='$sid'";

    $res = $mysqli->query($sql);

    $row = $res->fetch_assoc();

    $json = json_encode($row);

    echo $json;

    $mysqli->close();
?>