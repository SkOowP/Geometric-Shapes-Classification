void setup() {
  size(64, 64);
}

void draw() {

  for (int i = 0; i < 3; i++) {
    background(255);
    pushMatrix();
    strokeWeight(4);
    
    float radius = random(8, 24);
    float x = random(radius, width-radius);
    float y = random(radius, height-radius);
    stroke(random(100), random(100), random(100));
    
    translate(x, y);
    
    if (i == 0) {
      circle(0, 0, radius * 2);
      saveFrame("data/circle####.png");
    } 
    
    else if (i == 1) {
      rectMode(CENTER);
      rotate(random(-0.1, 0.1));
      square(0, 0, radius * 2);
      saveFrame("data/square####.png");
    } 
    
    else if (i == 2) {
      rotate(random(-0.1, 0.1));
      triangle(0, -radius, radius, radius, -radius, radius);
      saveFrame("data/triangle####.png");
    }
    popMatrix();
  }

  if (frameCount == 100) {
    exit();
  }
}
