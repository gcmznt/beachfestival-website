<?php

	if(isset($_POST['email']) && $_POST['email'] != '') {
		mail('beach@tchoukballfestival.com', 'Staff alert!', $_POST['text'], "From: {$_POST['name']} <{$_POST['email']}>");
		echo 1;
	} else {
		echo 0;
	}