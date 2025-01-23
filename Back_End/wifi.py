
import rp2
import network
import time
from   machine import Pin


# Instantiate board LED
led = Pin("LED", Pin.OUT)

# Turn it off for good measure
led.off()

def connectWiFi(ssid,password,country):
    # Setting country code - Helps with faster connection, even if not necessary
    rp2.country(country)

    # Connect to wi-fi
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    try:
        wlan.connect(ssid, password)
    except OSError as error:
        print(f'error is {error}')

    # Wait for connection or failure
    while True:
        try:
            count = 0
            while count < 10:
            # If the connection is succesfull, stop
                if wlan.status() < 0 or wlan.status() >= 3:
                    break
            # If not, wait
                print('waiting for connection...')
                # blink LED to show the connection is in progress
                led.on()
                time.sleep(0.5)
                led.off()
                time.sleep(0.5)
                count += 1
        # If the program is interrupted, print a message (Useless in real world application)
        except KeyboardInterrupt:
            print("Stopped")

        # Handle connection error
        if wlan.status() != 3:
            raise RuntimeError('network connection failed')
        else:
        # If error free, get information
            print('connected')
            led.on()
            status = wlan.ifconfig()
            print( 'ip = ' + status[0] )
        return status
