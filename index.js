const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

let genres = [{id: 1, name: 'genre1'}]

// get all genres
app.get('/api/genres', (req, res) => {
    return res.send(genres)
});

// get specific genre by Id
app.get('/api/genres/:id', (req, res) => {
    const genre = findGenreByID(req, res);

    return res.send(genre);
});

// create new genre
app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const new_genre = {
        id: genres.length + 1, 
        name: req.body.name
    };
    genres.push(new_genre)
    return res.send(new_genre)
});
// update genre by ID
app.put('/api/genres/:id', (req, res) => {
    const genre = findGenreByID(req, res);

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    return res.send(genre);


});
// delete genre by ID
app.delete('/api/genres/:id', (req, res) => {
    const genre = findGenreByID(req, res);
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function findGenreByID(req, res) {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with that ID was not found');

    return genre;
}
function validateGenre(genre_obj) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
    })

    return schema.validate(genre_obj);
};

const port = process.env.PORT || 3000;
console.log(`Listening on port ${port}`);
app.listen(port)

