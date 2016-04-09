<?php 
	$username="root";
	$password="";
	$dbname="DBPHP";
	$host = "localhost";

	$connection=mysql_pconnect($host,$username,$password) or die("connection to the server fail".mysql_error());
	mysql_select_db($dbname, $connection) or die("could not open db:$dbname");
	// end connection

	

		$select = "SELECT * from tblInfo ORDER BY firstName DESC";
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
						"stLastName": "'.$row['lastName'].'",
						"stGender": "'.$row['gender'].'",
						"stDOB": "'.$row['DOB'].'",
						"stPOB": "'.$row['POB'].'"
					},
					';
			}else{
				$jsonData .='
					{
						"stFirstName": "'.$row['firstName'].'",
						"stLastName": "'.$row['lastName'].'",
						"stGender": "'.$row['gender'].'",
						"stDOB": "'.$row['DOB'].'",
						"stPOB": "'.$row['POB'].'"
					}
					';
			}
			
		}
		$jsonData .= ']';
		echo $jsonData;


?>