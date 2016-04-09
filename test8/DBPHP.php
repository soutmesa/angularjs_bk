<?php 
	$username="root";
	$password="P@ssw0rd";
	$dbname="angular_demo";
	$host = "localhost";

	$connection=mysql_pconnect($host,$username,$password) or die("connection to the server fail".mysql_error());
	mysql_select_db($dbname, $connection) or die("could not open db:$dbname");
	// end connection

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$firstName = $request->stFirstName;
	$lastName = $request->stLastName;

	$query="INSERT INTO people VALUES ('','$firstName','$lastName)";
	$suc = mysql_query($query);


	if($suc){

		$select = "SELECT * from people ORDER BY firstName DESC";
		$dataName = mysql_query($select);
		$num = mysql_num_rows($dataName);

		$jsonData = '[';
		$i = 0;
		while($row=mysql_fetch_array($dataName)){
			$i++;
			if($i < $num){
				$jsonData .='
					{
						"stFirstName": "'.$row['firstName'].'",
						"stLastName": "'.$row['lastName'].'"
					},
					';
			}else{
				$jsonData .='
					{
						"stFirstName": "'.$row['firstName'].'",
						"stLastName": "'.$row['lastName'].'"
					}
					';
			}
			
		}
		$jsonData .= ']';
		echo $jsonData;

	}else{
		// return response(['data' => "", 'status' => 'error']);	
	}	

?>