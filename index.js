// import data from './hello.js';
// const data = require('./hello.js');

const fs = require('fs').promises;

// fs.readFile('hello.txt').then((data) => {
//   console.log(data.toString());
// });

// fs.readFile('data.json').then((data) => {
//   console.log(JSON.parse(data));
// });

fs.readdir(__dirname)
  .then((files) => {
    return Promise.all(
      files.map(async (filename) => {
        const stats = await fs.stat(filename);
        return {
          name: filename,
          size: stats.size,
          date: stats.mtime,
        };
      })
    );
  })
  .then((result) => console.table(result));
