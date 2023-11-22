function getSleepHours(day) { 
    switch (day){
      case 'Monday':
        return 8.0;
        break;
      case 'Tuesday':
        return 8.1;
        break;
      case 'Wednesday':
        return 8.2;
        break;
      case 'Thursday':
        return 8.3;
        break;
      case 'Friday':
        return 8.4;
        break;
      case 'Saturday':
        return 8.5;
        break;  
      case 'Sunday':
        return 8.6;
        break;                                    
    }
  }
//console.log(getSleepHours('monday'));
function getActualSleepHours(){
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let tot = 0;
  for(let i = 0; i < 7; i++){
    tot += getSleepHours(days[i]);
  }
  return tot;
}
const getIdealSleepHours = () => {
  let idealHours = 8;
  return idealHours * 7;
}

function calculateSleepDebt() {
    let actualSleepHours = getActualSleepHours();
    let IdealSleepHours = getIdealSleepHours();
    if(actualSleepHours === IdealSleepHours){
      console.log('You got the perfect amount of sleep!');
    }if(actualSleepHours > IdealSleepHours){
      console.log('You got more sleep than needed!');
    }if(actualSleepHours < IdealSleepHours){
      console.log('You should get some rest!');
    }
}
console.log(getActualSleepHours());
calculateSleepDebt();