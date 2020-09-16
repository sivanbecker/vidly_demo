const config = require('config')
const express = require('express');
const genres = require('./routes/genres');
const homepage = require('./routes/homepage');
const logger = require('./middleware/logger')
const authenticate = require('./middleware/authenticate');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

// middleware
app.use(express.json());
app.use(logger);
app.use(authenticate);

app.use('/api/genres', genres);
app.use('/', homepage);

const port = process.env.PORT || config.get('port') || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))

