const int LED = 13;

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
}

void loop() {
  // data received
  if (Serial.available() > 0) {
    char i = Serial.read();
    Serial.print(" arduino received => ");
    Serial.print(i);
    Serial.print("\n");
    switch (i) {
      case '0':
        digitalWrite(LED, 0);
        break;
      case '1':
        digitalWrite(LED, 1);
        break;
    }
  }
}
