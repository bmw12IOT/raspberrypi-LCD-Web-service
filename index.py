import http.server
import lcddriver
from time import *
import urlparse

PORT_NUMBER = 8080
lcd = lcddriver.lcd()
lcd.lcd_clear()

def changeLCDMessage(msg):
    lcd.lcd_display_string("DonatoPI", 1)
    lcd.lcd_display_string("", 2)
    lcd.lcd_display_string(msg, 3)
    lcd.lcd_display_string("", 4)

class myHandler(http.server.BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/json')
        self.end_headers()

        qs = {}
        path = self.path
        if '?' in path:
            path, tmp = path.split('?', 1)
            qs = urlparse.parse_qs(tmp)
            changeLCDMessage(qs["msg"])
        # Send the html message
        self.wfile.write("Hello World !")
        return

try:

    server = http.server.HTTPServer(('', PORT_NUMBER), myHandler)
    print ('Started httpserver on port ' , PORT_NUMBER)

    server.serve_forever()

except KeyboardInterrupt:
    print ('<taste zum beenden>')
    server.socket.close()
