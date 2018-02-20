// const {SHA256} = require('crypto-js');

//
// var message = "I am user number 3";
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`hash: ${hash}`);

// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed dont trust');
// }

// const jwt = require('jsonwebtoken');
//
// var data = {
//   id: 10
// };
//
// //jwt.sign(data, secret)
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// //jwt.verify(token, secret)
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

const bcrypt = require('bcryptjs');

var password = '123abc!';

//getSalt(rounds, callback)
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$c.u848ALKAEnzwqgnwXLbOlYRFLedrdYjTHBXyqAqZADc.JpYk7vS';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
