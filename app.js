const express = require('express');

const app = express();

// app.get('/', (request, response) => {
//   response
//     .status(200)
//     .json({ message: 'Hello from the server!!!', app: 'Natours' });
// });

// app.post('/', (request, response) => {
//   response.send('You can post to this endpoint');
// });

const port = 3000;
app.listen(port, () => {
  console.log('App running ...');
});