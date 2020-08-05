<?php
header('Access-Control-Allow-Origin:*');

header('Access-Control-Allow-Method:POST,GET');
    include('./conn.php');

    $sql = "select * from register";

    $res = $mysqli->query($sql);

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;

    $mysqli->close();
?>