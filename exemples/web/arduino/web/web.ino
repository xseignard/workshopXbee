const int YELLOW = 13;
const int GREEN = 12;
const int RED = 11;

void setup() {
  Serial.begin(9600);
  pinMode(YELLOW, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(RED, OUTPUT);
  // turn off the leds
  digitalWrite(GREEN, 0);
  digitalWrite(YELLOW, 0);
  digitalWrite(RED, 0);
}

void loop() {
  if (Serial.available() > 0) {
    char i = Serial.read();
    //Serial.print(" arduino received => ");
    //Serial.print(i);
    //Serial.print("\n");
    switch (i) {
      case '0':
        digitalWrite(GREEN, !digitalRead(GREEN));
        break;
      case '1':
        digitalWrite(YELLOW, !digitalRead(YELLOW));
        break;
      case '2':
        digitalWrite(RED, !digitalRead(RED));
        break;
      case 's':
        char ascii[32];
        sprintf(ascii, "{\"green\":%i,\"yellow\":%i,\"red\":%i}", digitalRead(GREEN), digitalRead(YELLOW), digitalRead(RED));
        Serial.print(ascii);
        break;
    }
  }
}
