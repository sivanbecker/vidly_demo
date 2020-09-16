const Joi = require('joi');
const express = require('express');
const router = express.Router();

let genres = [
    {id: 1, name: 'genre1'},
    {id: 2, name: 'genre2'},
    {id: 3, name: 'genre3'},
]

// get all genres
router.get('/', (req, res) => {
    return res.send(genres)
});

// get specific genre by Id
router.get('/:id', (req, res) => {
    const genre = findGenreByID(req, res);

    return res.send(genre);
});

// create new genre
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
    const genre = findGenreByID(req, res);

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    return res.send(genre);


});
// delete genre by ID
router.delete('/:id', (req, res) => {
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

module.exports = router;