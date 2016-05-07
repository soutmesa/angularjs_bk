<?php 
$db_host="localhost";
$db_name="angularjs_bk";
$db_user="root";
$db_pass="P@ssw0rd";


$db_connect = new PDO('mysql:host='. $db_host .';dbname='. $db_name .';charset=utf8', $db_user, $db_pass);
$db_connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db_connect->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db_connect->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAMES 'utf8'");

switch ($_REQUEST['act']) {
	case 'getall':
		try {
			$stmt = $db_connect->prepare("SELECT * FROM people");
			$stmt->execute(); 
			// return all datas queried object
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);  
			echo json_encode($results);
		} catch(PDOException $ex) {
		    //Something went wrong rollback!
		    echo $ex->getMessage();
		}
		break;
	case 'get':
		try {
			$id = $_GET['id'];
			$stmt = $db_connect->prepare("SELECT * FROM people WHERE id = ".$id);
			$stmt->execute();
			// return all datas queried object
			$results = $stmt->fetch(PDO::FETCH_ASSOC);  
			echo json_encode($results);
		} catch(PDOException $ex) {
		    //Something went wrong rollback!
		    echo $ex->getMessage();
		}
		break;
	case 'post':
		try {
			$data = json_decode(file_get_contents("php://input"));
			$stmt = $db_connect->prepare("INSERT INTO people(firstName, lastName, email, company) VALUES(:f_name, :l_name, :email, :company)");
			$stmt->execute(array(
				':f_name' => $data->firstName,
				':l_name' => $data->lastName,
				':email' => $data->email,
				':company' => $data->company
				));
			if ($stmt->rowCount() > 0) {
			    $id = $db_connect->lastInsertId();
			    $stmt = $db_connect->prepare("SELECT * FROM people WHERE id = ". $id);
			    $stmt->execute();
			    // return one object
				$results = $stmt->fetch(PDO::FETCH_ASSOC);  
				echo json_encode($results);
			}else{
				echo "Failed";
			}
		} catch(PDOException $ex) {
		    //Something went wrong rollback!
		    echo $ex->getMessage();
		}
		break;
	case 'put':
		try {
			$data = json_decode(file_get_contents("php://input"));
			//var_dump($data);
			$stmt = $db_connect->prepare("UPDATE people SET firstName=:f_name, lastName=:l_name, email=:email, company=:company WHERE id=:id");
			$stmt->execute(array(
				':f_name' => $data->firstName,
				':l_name' => $data->lastName,
				':email' => $data->email,
				':company' => $data->company,
				':id' => $data->id
				));	
			if($stmt->rowCount() > 0){
				$stmt = $db_connect->prepare("SELECT * FROM people WHERE id = ".$data->id);
			    $stmt->execute();
				$results = $stmt->fetch(PDO::FETCH_ASSOC);  
				echo json_encode($results);
				//echo $data->id;
			}else echo "Failed";
		} catch(PDOException $ex) {
		    //Something went wrong rollback!
		    echo $ex->getMessage();
		}
		break;
	case 'del':
		try {
			$stmt = $db_connect->prepare("DELETE FROM people WHERE id=?");
			$stmt->execute(array($_GET['id']));	
			if($stmt->rowCount() > 0){
				echo "deleted";
			}else echo "Failed";		
		} catch(PDOException $ex) {
		    //Something went wrong rollback!
		    echo $ex->getMessage();
		}
		break;
	default:
		# code...
		break;
}