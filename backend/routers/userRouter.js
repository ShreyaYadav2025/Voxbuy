const express = require("express");

const router = express.Router();
const Model = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = require('../middlewares/verifyToken');

router.post('/add', (req, res) => {
  console.log(req.body);
  new Model(req.body).save()
    .then((result) => {
      res.status(200).json(result);

    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);

    });
});



router.get('/getbyemail/:email', (req, res) => {
  console.log(req.params.email);
  res.send('respond from user email');
});


//getall
router.get('/getall', (req, res) => {
  Model.find()
    .then((result) => {
      res.status(200).json(result);

    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);

    });
});

router.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);

    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);

    });

});

router.post('/authenticate', (req, res) => {
  Model.findOne(req.body)
    .then((result) => {

      if (result) {
        //login success-generate token

        const { _id, name, email } = result;
        const payload = { _id, name, email };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '2d' },
          (err, token) => {
            if (err) {
              console.log(err);
              res.status(500).json(err);

            } else {
              res.status(200).json({ token });
            }
          }

        )


      } else {
        //login failed-send error message
        res.status(401).json({ message: 'invalid username or password' });
      }

    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);

    });
})

// update
router.put('/update/:id', (req, res) => {

  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/getdetails', verifyToken, async (req, res) => {
  try {
    console.log(req.user);

    const user = await Model.findById(req.user._id).select('-password'); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
});

module.exports = router;