const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");


axios('https://jsonplaceholder.typicode.com/users')
    .then(({data})  => fs.writeFile('text.json', JSON.stringify(data)))
    .then(() => fs.readFile('text.json'))
    .then(userFromFile => console.log(JSON.parse(userFromFile.toString())))
    .catch(err => console.log(err))


// let copy = async (directoryFrom, directoryTo) => {
//     let files = await fs.readdir(path.join(__dirname, 'students', directoryFrom));
//     for (let i = 0; i < files.length; i++) {
//         await fs.rename(
//             path.join(__dirname, 'students', directoryFrom, files[i]),
//             path.join(__dirname, 'students', directoryTo, files[i])
//         )
//     }
// }
//
// let replace = async (dir1, dir2) => {
//     await fs.mkdir(path.join(__dirname, 'students', 'temporary')).catch(err => console.log(err));
//     await copy(dir1, 'temporary');
//     await copy(dir2, dir1);
//     await copy('temporary', dir2);
//     await fs.rmdir(path.join(__dirname, 'students', 'temporary')).catch(err => console.log(err));
//
// }
// replace('1800', '2000');

