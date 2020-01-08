const Institute = require("../models/institute.model.js");

// Create and Save a new Institute
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Institute
  const institute = new Institute({
      inst_name: req.body.inst_name, 
      inst_type: req.body.inst_type,
      inst_address: req.body.inst_address, 
      inst_city: req.body.inst_city,
      inst_state: req.body.inst_state, 
      inst_country: req.body.inst_country,
      inst_zip: req.body.inst_zip, 
      inst_status: req.body.inst_status
  });

 

  // Save Institute in the database
  Institute.create(institute, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Institute."
      });
    else res.send(data);
  });
};

// Retrieve all Institutes from the database.
exports.findAll = (req, res) => {
  Institute.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving institutes."
      });
    else res.send(data);
  });
};

// Find a single Institute with a instituteId
exports.findOne = (req, res) => {
  Institute.findById(req.params.instituteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Institute with id ${req.params.instituteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Institute with id " + req.params.instituteId
        });
      }
    } else res.send(data);
  });
};

// Update a Institute identified by the instituteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Institute.updateById(
    req.params.instituteId,
    new Institute(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Institute with id ${req.params.instituteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Institute with id " + req.params.instituteId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Institute with the specified instituteId in the request
exports.delete = (req, res) => {
  Institute.remove(req.params.instituteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Institute with id ${req.params.instituteId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Institute with id " + req.params.instituteId
        });
      }
    } else res.send({ message: `Institute was deleted successfully!` });
  });
};
