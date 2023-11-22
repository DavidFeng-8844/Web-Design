const getUserChoice = userInput => {
    userInput = userInput.toLowerCase();
    if(userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput === 'bomb'){
      return userInput;
    }else{
      console.log('Error!');
    }
  };

  function getComputerChoice() {
    let cnum = Math.floor(Math.random() * 3);
    switch (cnum) {
      case 0:
        return 'rock';
        break;
      case 1:
        return 'paper';
        break;
      case 2:
        return 'scissors';
        break;
    }
  }

const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === 'bomb'){
        return 'Kaboom! You win!';
    }

    if (userChoice === computerChoice){
      return 'tie';
    }

    if (userChoice === 'rock'){
      if(computerChoice === 'paper'){
        return 'Computer wins';
      }
      else{
        return 'You win';
      }
    }

    if (userChoice === 'paper'){
      if(computerChoice === 'scissors'){
        return 'Computer wins';
      }
      else{
        return 'You win';
      }
    }

    if (userChoice === 'scissors'){
      if(computerChoice === 'rock'){
        return 'Computer wins';
      }
      else{
        return 'You win';
      }
    }

}

function playgame(userChoice, computerChoice){
  console.log(`User Choice: ${userChoice}`);
  console.log(`Computer Choice: ${computerChoice}`);
  console.log(determineWinner(userChoice,computerChoice));
}
/*Test
console.log(getUserChoice('paper'));
*/

//Test for getComputerChoice
/*console.log(getComputerChoice());
console.log(getComputerChoice());
console.log(getComputerChoice());*/

/*Test for determineWinner
for(let i = 0; i < 10; i++){
console.log(determineWinner(getUserChoice('rock'), getComputerChoice()));
}*/

playgame(getUserChoice('bomb'), getComputerChoice());







