<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

$name = $data['name'];
$email = $data['email'];
$title = $data['textheader'];
$phone = $data['tel'];
$msg = $data['textarea'];

//$title = 'Заявка с сайта'; // Название письма
$body = '<p>Имя: <strong>'.$name.'</strong></p>'.
        '<p>Электронная почта: <strong>'.$email.'</strong></p>'.
        '<p>Телефон: <strong>'.$phone.'</strong></p>'.
        '<p>Сообщение: <strong>'.$msg.'</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Настройки почты отправителя
  $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
  $mail->Username   = 'alexeyalexeyeffv@mail.ru'; // Логин на почте
  $mail->Password   = 'kzUmG9DQ2NcLmumUvLyW'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('alexeyalexeyeffv@mail.ru'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('andrew1995sm@gmail.com');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send('d');

  // Сообщение об успешной отправке
  echo ('Сообщение успешно отправлено');

} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo('Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}');
}
