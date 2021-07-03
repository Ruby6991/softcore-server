const Employee = require('../models/employee');

const employee_index = (req, res) => {
  Employee.find().sort({ createdAt: -1 })
    .then(result => {
      res.json({
        employees:result
      })
    })
    .catch(err => {
      console.log(err);
    });
}

const employee_details = (req, res) => {
  const id = req.params.employeeId;
  Employee.findById(id)
    .then(result => {
      res.json({
        employee:result
      })
    })
    .catch(err => {
      console.log(err);
    });
}

const employee_update_put = (req, res) => {
    const id = req.params.employeeId;
    Employee.findByIdAndUpdate(id, {
        availability: req.params.availability
    },{new: true})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

module.exports = {
    employee_index, 
    employee_details,  
    employee_update_put
}