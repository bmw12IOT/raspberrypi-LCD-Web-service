from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
import lcddriver
from time import *
import urlparse
from cgi import parse_header, parse_multipart

PORT_NUMBER = 6349
lcd = lcddriver.lcd()
lcd.lcd_clear()

def changeLCDMessage(pln1, pln2, pln3, pln4):
    lcd.lcd_clear()
    lcd.lcd_display_string(str(pln1), 1)
    lcd.lcd_display_string(str(pln2), 2)
    lcd.lcd_display_string(str(pln3), 3)
    lcd.lcd_display_string(str(pln4), 4)

class myHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/json')
        self.end_headers()
        self.wfile.write("make a Post request")
        return

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        postdataqs = self.rfile.read(content_length) # <--- Gets the data itself
        qs = urlparse.parse_qs(postdataqs)
        
        ln1 = ""
        ln2 = ""
        ln3 = ""
        ln4 = ""

        if 'ln1' in  qs:
            ln1 = qs['ln1'][0]


        if 'ln2' in  qs:
            ln2 = qs['ln2'][0]


        if 'ln3' in  qs:
            ln3 = qs['ln3'][0]


        if 'ln4' in  qs:
            ln4 = qs['ln4'][0]



        changeLCDMessage(ln1, ln2, ln3, ln4)

        self.send_response(200)
        self.send_header('Content-type','text/json')
        self.end_headers()
        self.wfile.write("OK")

try:

    server = HTTPServer(('', PORT_NUMBER), myHandler)
    print 'Started httpserver on port ' , PORT_NUMBER

    server.serve_forever()

except KeyboardInterrupt:
    print '<taste zum beenden>'
    server.socket.close()
