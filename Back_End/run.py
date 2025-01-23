import wifi
import os
import socket
import json
import ledControlFile

ssid     = "Nico si Robert"
password = "MariaNicoleta24!"
country  = "Ro"

#Connect to wifi, with credential shown above
wifi_connection = wifi.connectWiFi(ssid,password,country)

# Open socket
addr = socket.getaddrinfo('0.0.0.0', 80)[0][-1]
s = socket.socket()
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1) #avoids errors for address in use on reconnection
s.bind(addr)
s.listen(1)

print('listening on', addr)

ledControl = ledControlFile.ledControlClass(28,0)

# Listen for connections
while True:
    try:
        cl, addr = s.accept()
        print('client connected from', addr)
        request = cl.recv(1024)
        try:
            jsonBody = json.loads("{" + request.decode().split("{", 1)[1])
            colors_unordered = list(jsonBody["color"].values())
            color = [colors_unordered[2], colors_unordered[1], colors_unordered[0]]
            print(color)
            ledControl.fill(color)
        except:
            print("Unvalid Req")

        responseType = 'HTTP/1.0 200 OK\n'

        response_headers = {
          'Access-Control-Allow-Origin': '*'
        }

        response_headers_raw = ''.join('%s: %s\n' % (k, v) for k, v in response_headers.items())

        cl.send(responseType)
        cl.send(response_headers_raw)
        cl.send("\n")
        cl.close()


    except OSError as e:
        cl.close()
        print('connection closed')
