<?php
$typeEmail = htmlspecialchars(trim(strip_tags(stripslashes($_POST['email']))));
class TEmail {
	public $t;
	public function __construct($t) {
		$this->typeEmail = $t;
	}
	public $from_name = 'Marafon7';
	public $to_name = 'Marafon7';
	public $subject;
	public $data_charset='UTF-8';
	public $send_charset='windows-1251';
	public $body='';
	public $type='text/html';

	
	function send(){
		$dc=$this->data_charset;
		$sc=$this->send_charset;
		$enc_to= $this->mime_header_encode($this->to_name,$dc,$sc).' <'.$this->typeEmail.'>';
		$enc_subject=$this->mime_header_encode($this->subject,$dc,$sc);
		$enc_from= $this->mime_header_encode($this->from_name,$dc,$sc).' <'.$this->typeEmail.'>';
		$enc_body=$dc==$sc?$this->body:iconv($dc,$sc.'//IGNORE',$this->body);
		$headers='';
		$headers.="Mime-Version: 1.0\r\n";
		$headers.="Content-type: ".$this->type."; charset=".$sc."\r\n";
		$headers.="From: ".$enc_from."\r\n";
		return mail($enc_to,$enc_subject,$enc_body,$headers);
	}

	function mime_header_encode($str, $data_charset, $send_charset) {
		if($data_charset != $send_charset)
		$str=iconv($data_charset,$send_charset.'//IGNORE',$str);
		return ('=?'.$send_charset.'?B?'.base64_encode($str).'?=');
	}
}
$emailgo = new TEmail($typeEmail);
$emailgo->subject = $sj;
$emailgo->body = 'Я новое письмо!';
$json = $emailgo->send() ? 1 : 0;
echo json_encode($json);