const getUserChoice = userInput => {
    userInput = userInput.toLowerCase();
    if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput === 'bomb') {
      return userInput;
    } else {
      console.log('Error!');    
    }
  };
  
  // Testing - can be deleted
  console.log('Testing getUserChoice...');
  // Should print 'paper'
  console.log(getUserChoice('Paper'));
  // Should print 'Error!' and undefined
  console.log(getUserChoice('fork'));
  // Should print 'bomb'
  console.log(getUserChoice('Bomb'));
  
  const getComputerChoice = () => {
    const rand = Math.floor(Math.random() * 3);
    
    switch (rand) {
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
  };
  
  // Testing - can be deleted
  console.log('Testing getComputerChoice...');
  // Should print 'rock', 'paper', or 'scissors'
  console.log(getComputerChoice()); 
  
  const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === 'bomb') {
      return 'The user won!';
    }
    
    if (userChoice === computerChoice) {
      return 'The game is a tie!';
    }
    
    if (userChoice === 'rock') {
      if (computerChoice === 'paper') {
        return 'The computer won!';
      } else {
        return 'The user won!';
      }
    }
    
    if (userChoice === 'paper') {
      if (computerChoice === 'scissors') {
        return 'The computer won!';
      } else {
        return 'The user won!';
      }
    }
    
    if (userChoice === 'scissors') {
      if (computerChoice === 'rock') {
        return 'The computer won!';
      } else {
        return 'The user won!';
      }
    }
  };
  
  // Testing - can be deleted
  console.log('Testing determineWinner...');
  // Should print 'The computer won!'
  console.log(determineWinner('paper', 'scissors')); 
  // Should print 'The game is a tie!'
  console.log(determineWinner('paper', 'paper'));
  // Should print 'The user won!'
  console.log(determineWinner('paper', 'rock')); 
  // Should print 'The user won!'
  console.log(determineWinner('bomb', 'rock'));
  
  const playGame = () => {
    const userChoice = getUserChoice('scissors');
    const computerChoice = getComputerChoice();
    
    console.log(`You threw: ${userChoice}`);
    console.log(`The computer threw: ${computerChoice}`);
    
    console.log(determineWinner(userChoice, computerChoice));
  };
  
  playGame();