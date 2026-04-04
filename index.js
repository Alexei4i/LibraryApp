import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req,res) => {
    console.log('Come onnnnn');
    res.send('Hello People');
});
app.listen(PORT, () => {
  console.log(`Server Running on port: http://localhost:${PORT}`)
});
