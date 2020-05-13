const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const router = express.Router();

router.get('/', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

router.post('/', (req, res) => {
  //Сделал по аналогии с уроком.
  /*fs.readFile('./server/db/stats.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //Записываем в JSON формате метод, тело объекта и дату. Но у меня поучему то ошибка
      //Cannot set headers after they are sent to the client. не могу понять в чем дело
      let date = new Date();
      res.write(JSON.stringify([res.method, res.body, date],null, 4));
    }
  });*/
  handler(req, res, 'add', './server/db/userCart.json');
});
// localhost:3000/api/cart/123 // req.params.id
// localhost:3000/api/cart/?var1='sfsf'&var2='ada' // req.query
router.put('/:id', (req, res) => {
  /*fs.readFile('./server/db/stats.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let date = new Date();
      res.write(JSON.stringify([res.method, res.body, date],null, 4));
    }
  });*/
  handler(req, res, 'change', './server/db/userCart.json');
});

router.delete('/:id', (req, res) => {
  debugger
  /*fs.readFile('./server/db/stats.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let date = new Date();
      res.write(JSON.stringify([res.method, res.body, date],null, 4));
    }
  });*/
  handler(req, res, 'del', './server/db/userCart.json');
});

module.exports = router;
