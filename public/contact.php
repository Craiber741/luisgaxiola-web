<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "hola@luisgaxiola.com";
    $subject = "Nueva consulta desde la web: " . $_POST['subject'];
    
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $service = $_POST['service'] ?? 'General';

    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    $email_content = "Nombre: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Servicio: $service\n\n";
    $email_content .= "Mensaje:\n$message\n";

    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(["status" => "success", "message" => "Mensaje enviado correctamente."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "No se pudo enviar el mensaje."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}
?>
