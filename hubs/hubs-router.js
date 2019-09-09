const Hubs = require('./hubs-model.js');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  Hubs.find()
    .then(hubs => res.status(200).json(hubs))
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "Error getting hubs"});
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Hubs.findById(id)
    .then(hub => {
      if (hub) {
        res.status.json(hub);
      } else {
        res.status(404).json({ error: "Hub with id not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error getting hub" });
    });
});

router.post('/', (req, res) => {
});

router.put('/:id', (req, res) => {
});

router.delete('/:id', (req, res) => {
});

router.get('/:id/messages', (req, res) => {
});

router.post('/:id/messages', (req, res) => {
});

module.exports = router;
