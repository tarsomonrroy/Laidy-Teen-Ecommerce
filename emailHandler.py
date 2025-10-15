from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
def send_password_reset_email(email: str, token: str):
    reset_link = f"http://127.0.0.1:8000/reset-password?token={token}"
    
    # Create HTML content for the email body
    html_body = f"""
    <html>
        <body>
            <p>Olá,</p>
            <p>Use o seguinte link para reiniciar sua senha:</p>
            <p><a href="{reset_link}">{reset_link}</a></p>
            <p>Caso não tenha requisitado isto, pedimos para que ignore esse email.</p>
        </body>
    </html>
    """

    # Create an email message with both HTML and plain text content
    message = MIMEMultipart("alternative")
    message["Subject"] = "Password Reset Request"
    message["From"] = "LeidyMailer@email.com"
    message["To"] = email

    # Attach HTML and plain text parts to the message
    part1 = MIMEText("Olá,\n\nUse o seguinte link para reiniciar sua senha:\n{}\n\nCaso não tenha requisitado isto, pedimos para que ignore esse email.".format(reset_link), "plain")
    part2 = MIMEText(html_body, "html")

    # Add the parts to the message container
    message.attach(part1)
    message.attach(part2)

    # Replace with your email sending code (SMTP or third-party service)
    with smtplib.SMTP("sandbox.smtp.mailtrap.io", 587) as server:
        server.starttls()
        server.login("28585d1b05a826", "1d895b964db033")
        server.sendmail("LeidyMailer@email.com", email, message.as_string())

    #f"Olá,\n\nUse o seguinte link para reiniciar sua senha:\n{reset_link}\n\nCaso não tenha requisitado isto, pedimos para que ignore esse email."
    
    # Replace with your email sending code (SMTP or third-party service)
    with smtplib.SMTP("sandbox.smtp.mailtrap.io", 587) as server:
        server.starttls()
        server.login("28585d1b05a826", "1d895b964db033")
        server.sendmail("LeidyMailer@email.com", email, message.as_string())
        
        