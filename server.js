require('./acces_data_tables.js');
const express = require('express');
const { verification } = require('./auth/sct')
const hbs = require('hbs'); 

const app = express();
const port = process.env.PORT || 3000;


app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.json());

app.use('/sign-up', require('./routes/registation'))
app.use('/login', require('./routes/login'))
app.use('/home/new_post', verification, require('./routes/new_post'))
app.use('/feedback', verification, require('./routes/feedback'))
app.use('/home', verification,require('./routes/home'))

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));