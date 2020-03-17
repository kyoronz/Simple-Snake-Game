//solution found on
//https://stackoverflow.com/questions/12417937/create-a-simple-countdown-in-processing
//written by George Profenza

//timer class for JAVA can be found on
//http://docs.oracle.com/javase/6/docs/api/java/util/TimerTask.html

int time;
int wait = 1000;

void setup(){
  time = millis();//store the current time
}
void draw(){
  //check the difference between now and the previously stored time is greater than the wait interval
  if(millis() - time >= wait){
    println("tick");//if it is, do something
    time = millis();//also update the stored time
  }
}
