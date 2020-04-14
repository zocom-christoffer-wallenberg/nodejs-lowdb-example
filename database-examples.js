const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json')
const database = low(adapter)

database.defaults({ username: [], count: 0, account: [] }).write();

console.log('Using read(): ', database.read().value());
console.log('Using get(): ', database.get('username').value());

database.get('username').push('Chris').write();

let count = database.get('count').value();
console.log('Count is: ', count);
count++;
database.set('count', count).write();

database.get('account').push({ username: 'Chris', password: 'pwd123' }).write();

const result = database.get('account').find({ username: 'Chris' }).value();
const resultByFilter = database.get('account').filter({ username: 'Chris' }).value();
console.log('Result by find is: ', result);
console.log('Result by filter is: ', resultByFilter);

database.get('account').find({ id: 5 }).assign({ username: 'Christoffer' }).write();