const prompt = require("prompt-sync")();

const Rows = 3;
const Cols = 3;

const symbols_count = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const Symbol_multiplier = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

//collect deposite
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Deposit: $");
    const amount = parseFloat(depositAmount);

    if (isNaN(amount) || amount <= 0) {
      console.log("Invalid Entry");
    } else {
      return amount;
    }
  }
};

//Number of lines to bet on
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter number of lines(1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines");
    } else {
      return numberOfLines;
    }
  }
};

//total bet
const getbet = (balance, lines) => {
  while (true) {
    const bet = prompt("Bet: $");
    bet <= balance;
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Balance not enough");
    } else {
      return numberBet;
    }
  }
};

//wheel spin
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(symbols_count)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < Cols; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < Rows; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < Rows; i++) {
    rows.push([]);
    for (let j = 0; j < Cols; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

// Display
const output = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// Results
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let same = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        same = false;
        break;
      }
    }
    if (same) {
      winnings += bet * Symbol_multiplier[symbols[0]];
    }
  }
  return winnings;
};
//Determins wether win or loss
const game = () => {
  let balance = deposit();

  while (true) {
    console.log(`Your balance is: ${balance}`);
    const numberOfLines = getNumberOfLines();
    const bet = getbet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    output(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log(`You won $${winnings}  Balance: $${balance}`);
     
    if (balance === 0) {
      console.log(`Balance: ${balance}`)
      break;
    }

    const playAgain = prompt ("Do you want to play again (y/n)?");
    if (playAgain != "y") break;
  }
};

game();
