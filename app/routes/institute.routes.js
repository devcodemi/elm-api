module.exports = app => {
  const institutes = require("../controllers/institute.controller.js");

  // Create a new Institute
  app.post("/institutes", institutes.create);

  // Retrieve all Institutes
  app.get("/institutes", institutes.findAll);

  // Retrieve a single Institute with InstituteId
  app.get("/institutes/:instituteId", institutes.findOne);

  // Update a Institute with InstituteId
  app.put("/institutes/:instituteId", institutes.update);

  // Delete a Institute with InstituteId
  app.delete("/institutes/:instituteId", institutes.delete);

  
};
