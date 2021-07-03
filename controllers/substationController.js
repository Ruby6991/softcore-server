const Substation = require('../models/substation');

const substation_index = (req, res) => {
  Substation.find().sort({ createdAt: -1 })
    .then(result => {
      res.json({
        substations:result
      })
    })
    .catch(err => {
      console.log(err);
    });
}

const substation_details = (req, res) => {
  const id = req.params.substationId;
  Substation.findById(id)
    .then(result => {
      res.json({
        substation:result
      })
    })
    .catch(err => {
      console.log(err);
    });
}

const substation_update_put = (req, res) => {
    const id = req.params.substationId;
    Substation.findByIdAndUpdate(id, {
        availability: req.params.availability
    },{new: true})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
        res.render('404', { title: 'Substation not found' });
      });
  }

module.exports = {
    substation_index, 
    substation_details,  
    substation_update_put
}