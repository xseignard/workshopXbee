const int LED = 13;
const int BUTTON = 3;

int lastButtonState = LOW;

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
  pinMode(BUTTON, INPUT);
}

void loop() {
  // data received
  if (Serial.available() > 0) {
    char i = Serial.read();
    switch (i) {
      case '0':
        digitalWrite(LED, 0);
        break;
      case '1':
        digitalWrite(LED, 1);
        break;
    }
  }
  // send data
  int state = digitalRead(BUTTON);
  if (state != lastButtonState) {
    lastButtonState = state;
    if (lastButtonState == 1) {
      Serial.print('1');
    }
    else {
      Serial.print('0');
    }
  }
}
