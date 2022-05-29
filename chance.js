const chance = require('chance');

function main(action) {
  console.log(chance()[action]());
}

main(process.argv[2]);
