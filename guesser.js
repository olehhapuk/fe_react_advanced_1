const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const secretNumber = Math.floor(Math.random() * 10 + 1);

function game() {
  rl.question('Введіть число від 1 до 10 ', (data) => {
    const number = Number(data);

    if (isNaN(number)) {
      console.log('Ви ввели не число, спробуйте ще раз\n');
      game();
    } else if (number === secretNumber) {
      console.log('Вітаю! Ви вгадали число');
      rl.close();
    } else {
      console.log('Ви ввели неправильне число, спробуйте ще раз\n');
      game();
    }
  });
}

game();
