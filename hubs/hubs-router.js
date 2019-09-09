const Hubs = require('./hubs-model.js');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hubs = await Hubs.find();
    res.status(200).json(hubs);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: "Error getting hubs"});
  }
  // Hubs.find()
  //   .then(hubs => res.status(200).json(hubs))
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({error: "Error getting hubs"});
  //   });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const hub = await Hubs.findById(id);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ error: "Hub with id not found" });
      // throw new Error('hub with id not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error getting hub" });
  }
  // Hubs.findById(id)
  //   .then(hub => {
  //     if (hub) {
  //       res.status(200).json(hub);
  //     } else {
  //       res.status(404).json({ error: "Hub with id not found" });
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({ error: "Error getting hub" });
  //   });
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  let id;
  try {
    id = await Hubs.insert({ name });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error inserting hub" });
  }
  try {
    const hub = await Hubs.findById(id);
    res.status(200).json(hub);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Hub inserted, but error fetching it" });
  }
});

// const getData = async () => {
//   axios.get('/endpoint')
//     .then(res => {
//       setValue(res.data);
//     })
//     .catch(err => {
//       setError('Thing went wrong');
//     });

//   try {
//     const res = await axios.get('/endpoint');
//     setValue(res.data);
//   } catch (err) {
//     setError('Thing went wrong');
//   }
// };

// useEffect(() => {
//   getData();
// }, []);

router.put('/:id', (req, res) => {
});

router.delete('/:id', (req, res) => {
});

router.get('/:id/messages', (req, res) => {
});

router.post('/:id/messages', (req, res) => {
});

module.exports = router;
