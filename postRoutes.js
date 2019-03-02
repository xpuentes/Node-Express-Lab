const express = require('express');
const db = require('./data/db.js');
const router = express.Router();

router.use(express.json());

router.post('/posts', (req, res) => {
  const { title, contents } = req.body;

  if(!title || !contents) {
    res.status(400).json({errorMessage: 'Please provide title and contents for the post.'});
  } else {
    db.insert({title, contents})
      .then(post => {
        res.status(201).json(post)
      }).catch(err => {
        res.status(500).json({error: 'There was an error while saving the post to the database.'})
      });
  }
});

router.get('/posts', (req, res) => {
  db.find()
    .then(post => {
      res.json(post)
    }).catch(err => {
      res.status(500).json({error: 'The posts information could not be retrieved.'})
    });
});

router.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post =>{
      if(post[0]){
        res.json(post)
      }else{
        res.status(404).json({message: 'The post with specified ID does not exist!'})
      }
    }).catch(err => {
      res.status(500).json({error: 'The post information could not be retrieved.'})
    });
});

router.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(post =>{
      if(post){
        res.json(post);
      }else{
        res.status(404).json({message: 'The post with the specified ID does not exist.'})
      }
    }).catch(err => {
      res.status(500).json({error: 'The post could not be removed'})
    });
});

router.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if(!title || !contents) {
    res.status(400).json({errorMessage: 'Please provide title and contents for the post.'});
  } else {
    db.update(id, {title, contents})
      .then(post => {
        if(post){
          res.status(200).json({id, title, contents});
        }else{
          res.status(404).json({message: 'The post with the specified ID does not exist.'})
        }
      }).catch(err => {
        res.status(500).json({error: 'The post information could not be modified.'})
      });
  }
});

module.exports = router;
