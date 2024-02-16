var express = require('express');
var Book_Dtls = require('../models/db')
var router = express.Router();


router.get('/', async function(req, res, next) {
  try {
    const books = await Book_Dtls.findAll();
    res.send(books);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while trying to fetch the books' });
  }
});

router.get('/detail/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book_Dtls.findOne({where:{
      id:id
    }});

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



router.post('/create', async (request, response) => {
try {
  if (
    !request.body.title ||
    !request.body.author ||
    !request.body.publishYear
  ) {
    return response.status(400).send({
      message: 'Send all required fields: title, author, publishYear',
    });
  }
  const newBook = {
    title: request.body.title,
    author: request.body.author,
    publishYear: request.body.publishYear,
  };

  const book = await Book_Dtls.create(newBook);

  return response.status(201).send(book);
} catch (error) {
  console.log(error.message);
  response.status(500).send({ message: error.message });
}
});


router.put('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const { title, author, publishYear } = req.body;
  const book = await Book_Dtls.findByPk(id);
  if (book) {
    book.title = title
    book.author = author
    book.publishYear = publishYear
    await book.save();
    res.json(book);
  } else {
    res.status(404).json({ error: 'book not found' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book_Dtls.findByPk(id);

    if (!book) {
      return res.status(404).send({ error: 'Book not found' });
    }else{

    await book.destroy();

    res.send({ message: 'Book has been deleted' });
    }
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while trying to delete the book' });
  }
});


module.exports = router;
