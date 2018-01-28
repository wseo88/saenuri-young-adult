console.log('May Node be with you');

const express = require('express');
const app = express();


app.get('/', (request, response) => {
  response.send('hello world')
})


app.listen(3000, function() {
  console.log('listening on 3000')
})
