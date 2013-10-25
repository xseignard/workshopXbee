#include <XBee.h>

const int LED = 13;
const int BUTTON = 3;

int lastButtonState = LOW;

XBee xbee = XBee();
Rx16Response rx16 = Rx16Response();
Tx16Request tx;
uint8_t payload[] = {0};
uint16_t adress[] = {0x0003, 0x0001};

void setup() {
  Serial.begin(9600);
  xbee.setSerial(Serial);
  pinMode(LED, OUTPUT);
  pinMode(BUTTON, INPUT);
}

void loop() {
  xbee.readPacket();
  if (xbee.getResponse().isAvailable()) {
    // got something
    if (xbee.getResponse().getApiId() == RX_16_RESPONSE) {
      xbee.getResponse().getRx16Response(rx16);
      char data = rx16.getData(0);
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
  int state = digitalRead(BUTTON);
  if (state != lastButtonState) {
    lastButtonState = state;
    if (lastButtonState == 1) {
      payload[0] = '1';
    }
    else {
      payload[0] = '0';
    }
    tx = Tx16Request(adress[random(0, 2)], payload, sizeof(payload));
    xbee.send(tx);
  }
}