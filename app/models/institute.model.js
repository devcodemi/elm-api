const sql = require("./db.js");

// constructor
const Institute = function(institute) {
  this.inst_name = institute.inst_name;
  this.inst_type = institute.inst_type;
  this.inst_address = institute.inst_address;
  this.inst_city = institute.inst_city;
  this.inst_state = institute.inst_state;
  this.inst_country = institute.inst_country;
  this.inst_zip = institute.inst_zip;
  this.inst_status = institute.inst_status;  
};

Institute.create = (newInstitute, result) => {
  sql.query("INSERT INTO institute_info SET ?", newInstitute, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created institute: ", { inst_id: res.inst_id, ...newInstitute });
    result(null, { id: res.inst_id, ...newInstitute });
  });
};

Institute.findById = (instituteId, result) => {
  sql.query(`SELECT * FROM institute_info WHERE inst_id = ${instituteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found institute: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Institute with the id
    result({ kind: "not_found" }, null);
  });
};

Institute.getAll = result => {
  sql.query("SELECT * FROM institute_info", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("institutes: ", res);
    result(null, res);
  });
};

Institute.updateById = (id, institute, result) => {
  sql.query(
    "UPDATE institute_info SET inst_name = ?, inst_type = ?, inst_address = ?,  inst_city = ?, inst_state = ?, inst_country = ?,  inst_zip = ?, inst_status = ? WHERE inst_id = ?",
    [institute.inst_name, institute.inst_type, institute.inst_address, institute.inst_city, institute.inst_state, institute.inst_country, institute.inst_zip, institute.inst_status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Institute with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated institute: ", { id: id, ...institute });
      result(null, { id: id, ...institute });
    }
  );
};

Institute.remove = (id, result) => {
  sql.query("DELETE FROM institute_info WHERE inst_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Institute with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted institute with id: ", id);
    result(null, res);
  });
};

module.exports = Institute;