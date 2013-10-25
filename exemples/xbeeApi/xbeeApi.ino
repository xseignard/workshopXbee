#include <XBee.h>

const int LED = 13;
const int BUTTON = 3;

int lastButtonState = LOW;

XBee xbee = XBee();
Rx16Response rx16 = Rx16Response();
Tx16Request tx;
uint8_t payload[] = {0};

uint16_t adress = 0x0001;
//uint16_t adress = 0x0002;
//uint16_t adress = 0x0003;

void setup() {
  Serial.begin(9600);
  xbee.setSerial(Serial);
  pinMode(LED, OUTPUT);
  pinMode(BUTTON, INPUT);
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
  // send data (i.e. payload) through xbee api
  int state = digitalRead(BUTTON);
  if (state != lastButtonState) {
    lastButtonState = state;
    if (lastButtonState == 1) {
      payload[0] = '11';
    }
    else {
      payload[0] = '10';
    }
    tx = Tx16Request(adress, payload, sizeof(payload));
    xbee.send(tx);
  }
}