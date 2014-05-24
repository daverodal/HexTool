<?php
define("MAPROOT","../../maproot");
if($_SERVER['REQUEST_METHOD'] == 'PUT'){
    $putdata = fopen("php://input", "r");
    $pInfo = $_SERVER['PATH_INFO'];

    /* Open a file for writing */
    $fp = fopen(MAPROOT."$pInfo", "w");

    /* Read the data 1 KB at a time
       and write to the file */
    while ($data = fread($putdata, 1024))
        fwrite($fp, $data);

    /* Close the streams */
    fclose($fp);
    fclose($putdata);
    $matches = [];
    preg_match("/(\d*)$/",$pInfo,$matches);
    $id = $matches[1];
    $pName = preg_replace("/\/[^\/]*$/","",$pInfo);
    $pName = preg_replace("/\//","",$pName);
    $pName = preg_replace("/maps/","map",$pName);
    $pName = preg_replace("/hexes/","hex",$pName);
    $ret = json_decode(file_get_contents(MAPROOT."$pInfo"));
    $ret->$pName->id = $id;
    header('Content-type: application/json');
    echo json_encode($ret);
    exit();
}
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $pInfo = $_SERVER['PATH_INFO'];
    $id = file_get_contents(MAPROOT."$pInfo/_id");
    file_put_contents(MAPROOT."$pInfo/_id",$id+1);
    $id = trim($id);
    $putdata = fopen("php://input", "r");

    /* Open a file for writing */
    $fp = fopen(MAPROOT."$pInfo/$id", "w");

    /* Read the data 1 KB at a time
       and write to the file */
    while ($data = fread($putdata, 1024))
        fwrite($fp, $data);

    $pName = preg_replace("/\//","",$pInfo);
    $pName = preg_replace("/maps/","map",$pName);
    $pName = preg_replace("/hexes/","hex",$pName);
    /* Close the streams */
    fclose($fp);
    fclose($putdata);
    $ret = json_decode(file_get_contents(MAPROOT."$pInfo/$id"));
    $ret->$pName->id = $id;
    header('Content-type: application/json');
    echo json_encode($ret);
    exit();

}

$pInfo = $_SERVER['PATH_INFO'];

$args = explode("/",$pInfo);
array_shift($args);
//if(count($args) != 1){
//    die("Not valid args $pInfo");
//}
@list($modelName,$id) = $args;
if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $top = new stdClass();
    $ret = array();
    $singleModel = substr($modelName,0, -1);
    if($id){
        $model = json_decode(file_get_contents(MAPROOT."/$modelName/$id"));
        $model->$singleModel->id = $id;
//        var_dump($model);
        $top->$singleModel = $model->$singleModel;
        header('Content-type: application/json');
        echo json_encode($top);
        exit();
    }
    $dirs = glob(MAPROOT."/$modelName/*");
    if (count($dirs) >= 0) {

        /* This is the correct way to loop over the directory. */
        foreach ($dirs as $entry) {
            if(preg_match("/\/_id$/",$entry)){
                continue;
            }
            $model = json_decode(file_get_contents($entry));
            $matches = array();
            preg_match("/[^\/]*$/",$entry,$matches);
            $model->$singleModel->id = $matches[0]-0;
            $ret[] = $model->$singleModel;
        }
            $top->$modelName = $ret;
    }
    header('Content-type: application/json');
    echo json_encode($top);
    exit();

}

