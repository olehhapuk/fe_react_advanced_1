const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.on('line', (data) => {
//   console.log(data);
// });

rl.question('Як вас звати? ', (data) => {
  console.log(`Привіт, ${data}`);
  rl.close();
});
