import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.base import MIMEBase
from email import encoders
import os.path
import sys

fromaddr = "JojoGreen1122@outlook.com"
toaddr = str(sys.argv[1])

envNum = str(sys.argv[2])
appNum = str(sys.argv[3])
reportsNum = str(sys.argv[4])
connNum = str(sys.argv[5])
smurfNum = str(sys.argv[6])
secNum = str(sys.argv[7])

msg = MIMEMultipart()

msg['From'] = fromaddr
msg['To'] = toaddr
msg['Subject'] = "Scheduled Reports"

body = "The issues completed were as follows:\nLow environment issue: %s\nApplication issue: %s\nReports issue: %s\nConnection issue: %s\nSMURF Alert issue: %s\nSecurity issue: %s\n" % (envNum, appNum, reportsNum, connNum, smurfNum, secNum)

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
server.login(fromaddr, "Can'tCrackThis")
text = msg.as_string()
server.sendmail(fromaddr, toaddr, text)
server.quit()

#Email: JojoGreen1122@outlook.com
#Password: Can'tCrackThis
