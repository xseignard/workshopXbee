#include <XBee.h>

const int LED = 13;

XBee xbee = XBee();
Rx16Response rx16 = Rx16Response();

void setup() {
  Serial.begin(9600);
  xbee.setSerial(Serial);
  pinMode(LED, OUTPUT);
}

void loop() {
  // check for xbee api packet
  xbee.readPacket();
  if (xbee.getResponse().isAvailable()) {
    if (xbee.getResponse().getApiId() == RX_16_RESPONSE) {
      // if the xbee packet we received is ok, get the data
      xbee.getResponse().getRx16Response(rx16);
      char data = rx16.getData(0);
      // turn on/off the led given the received data
      switch (data) {
        case '0':
          digitalWrite(LED, 0);
          break;
        case '1':
          digitalWrite(LED, 1);
          break;
      }
    }
  }
}