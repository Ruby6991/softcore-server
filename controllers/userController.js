const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user_index = (req, res) => {
  User.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { users: result, title: 'All users' });
    })
    .catch(err => {
      console.log(err);
    });
}

const user_details = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(result => {
      res.render('details', { user: result, title: 'User Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'User not found' });
    });
}

const user_create_get = (req, res) => {
  res.render('create', { title: 'Create a new user' });
}

const user_create_post = (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            });
        }

        const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPass,
            userType: req.body.userType
        });
        user.save()
            .then(result => {
            res.redirect('/homepage');
            })
            .catch(err => {
            console.log(err);
            });
    });
}

const user_authenticate = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email})
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password, function(err, result){
                    if(err) {
                        res.json({
                            error:err
                        })
                    }
                    if(result){
                        let token = jwt.sign({name: user.firstName}, 'verySecretValue', {expiresIn: '1h'});
                        res.json({
                            message:'Login Successful!',
                            token
                        })
                    }else{
                        res.json({
                            message:'Password incorrect'
                        })
                    }
                })
            }else{
                res.json({
                    message: 'No User Found!'
                })
            }
        })
}

module.exports = {
  user_index, 
  user_details, 
  user_create_get, 
  user_create_post,
  user_authenticate
}