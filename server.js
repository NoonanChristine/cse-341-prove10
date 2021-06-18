const express = require('express');
const router = express.Router();

//path to data
const dummyData = require('./data')

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData)
})

router.post('/insertName', (req, res, next) => {
  if (req.body.newName !== undefined) {
    const newName = req.body.newName

    if (!dummyData.avengers.some(a => a.name === newName)) {
      //push new object into the dummyData
      dummyData.avengers.push({ name: newName })
      res.sendStatus(200)
    }
  } else {
    res.sendStatus(400)
  }
})

router.get('/', (req, res, next) => {
  res.render('./avengers-list', {
    title: 'Assignment 10', 
    path: 'avengers-list'
  })
})

module.exports = router