const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('../views/homepage.pug', {title: 'My Vidly Demo', message: 'Hello Vidly User'})
    // res.send('Hello');
})
module.exports = router;