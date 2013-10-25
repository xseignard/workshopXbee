const int PHOTOCELL = A0;

void setup() {
  Serial.begin(9600);
  pinMode(PHOTOCELL, INPUT);
}

void loop() {
  // read the sensor value every second and send it
  // in a format node.js understands natively
  int cellValue = map(analogRead(PHOTOCELL), 0, 1024, 0, 255);
  char ascii[32];
  sprintf(ascii, "{\"cell\":%i}", cellValue);
  Serial.print(ascii);
  delay(1000);
}
