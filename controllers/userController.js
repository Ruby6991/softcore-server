const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user_index = (req, res) => {
  User.find()
    .then(result => {
        res.json({
            users:result
        })
    })
    .catch(err => {
      console.log(err);
    });
}

const user_details = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(result => {
        res.json({
            user:result
        })
    })
    .catch(err => {
      console.log(err);
    });
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
                            userType: user.userType,
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
  user_create_post,
  user_authenticate
}