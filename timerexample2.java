//solution found on 
//https://stackoverflow.com/questions/12417937/create-a-simple-countdown-in-processing
//written by George Profenza

//timer class for JAVA can be found on
//http://docs.oracle.com/javase/6/docs/api/java/util/TimerTask.html

int time;
int wait = 1000;

boolean tick;

void setup(){
  time = millis();//store the current time
  smooth();
  strokeWeight(3);
}
void draw(){
  //check the difference between now and the previously stored time is greater than the wait interval
  if(millis() - time >= wait){
    tick = !tick;//if it is, do something
    time = millis();//also update the stored time
  }
  //draw a visual cue
  background(255);
  line(50,10,tick ? 10 : 90,90);
}
