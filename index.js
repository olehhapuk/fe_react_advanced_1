const { program } = require('commander');

const { listUsers, getUser, createUser, deleteUser } = require('./users');

program
  .option('-a, --action <type>', 'Choose action')
  .option('-i, --id <type>', 'User id')
  .option('-u, --username <type>', 'Username')
  .option('-p, --password <type>', 'Password');
program.parse(process.argv);

const argv = program.opts();

switch (argv.action) {
  case 'list':
    listUsers();
    break;

  case 'get':
    getUser(Number(argv.id));
    break;

  case 'create':
    createUser(argv.username, argv.password);
    break;

  case 'delete':
    deleteUser(Number(argv.id));
    break;

  default:
    break;
}
