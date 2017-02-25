<?php
$email = htmlspecialchars(trim(strip_tags(stripslashes($_POST['email']))));
$transaction = htmlspecialchars(trim(strip_tags(stripslashes($_POST['transaction']))));
$file = 'data.txt';
// $file = 'http://novostiva.ru/Text-file/select.txt';
$text = $email . ' - ' . $transaction ."\n"; 
// Пишем эти параметры в файл
if (isset($email) && isset($transaction)) {
	if ($email == '' || $transaction == '') {
		echo var_dump($_POST);
	} else {
		file_put_contents($file, $text, FILE_APPEND | LOCK_EX);
		echo 1;
	}
} else {
	echo 'Данные не переданы!';
}