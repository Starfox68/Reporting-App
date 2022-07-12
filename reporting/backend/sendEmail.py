import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.base import MIMEBase
from email import encoders
import os.path
import sys

fromaddr = "MarkoPollos@outlook.com"
toaddr = str(sys.argv[1])

msg = MIMEMultipart()

msg['From'] = fromaddr
msg['To'] = toaddr
msg['Subject'] = "Wrong Email"

body = "Sorry wrong person"

msg.attach(MIMEText(body, 'plain'))


# attachment = ["C:\\Users\\parth\\Desktop\\sample.html"]
# for f in attachment:
#     with open(f, 'rb') as a_file:
#         basename = os.path.basename(f)
#         part = MIMEApplication(a_file.read(), Name=basename)

#     part['Content-Disposition'] = 'attachment; filename="%s"' % basename
#     msg.attach(part)


server = smtplib.SMTP('smtp.office365.com', 587)
server.starttls()
server.login(fromaddr, "UnbreakablePassword")
text = msg.as_string()
server.sendmail(fromaddr, toaddr, text)
server.quit()

#Email: MarkoPollos@outlook.com
#Password: UnbreakablePassword
