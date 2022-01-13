const db = require("../models");
const Company = db.company;

// Create and Save a new Company
exports.createCompany = (req, res) => {
  // Validate request
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.revenue ||
    !req.body.phone_code ||
    !req.body.phone_number
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Company
  const company = new Company({
    name: req.body.name,
    address: req.body.address,
    revenue: req.body.revenue,
    phone_code: req.body.phone_code,
    phone_number: req.body.phone_number,
  });

  // Save Company in the database
  company
    .save(company)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company.",
      });
    });
};

// Retrieve all Companys from the database.
exports.findAll = (req, res) => {
  Company.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving company.",
      });
    });
};

// Find a single Company with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Company.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Company with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Company with id=" + id });
    });
};

// Update a Company by the id in the request
exports.createOffice = (req, res) => {
  if (
    !req.body.name ||
    !req.body.location_lat ||
    !req.body.location_lng ||
    !req.body.start_date
  ) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const { company_id, name, location_lat, location_lng, start_date } = req.body;

  Company.findById(company_id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Company with id " + company_id });
      else {
        let mCompany = data;
        mCompany.offices = [
          ...mCompany.offices,
          {
            name,
            location_lat,
            location_lng,
            start_date,
          },
        ];
        Company.findByIdAndUpdate(company_id, mCompany, {
          useFindAndModify: false,
        })
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update Company with id=${company_id}. Maybe Company was not found!`,
              });
            } else res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Company with id=" + company_id,
            });
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Company with id=" + company_id });
    });
};

// Delete a Company with the specified id in the request
exports.deleteCompany = (req, res) => {
  const id = req.params.id;

  Company.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Company with id=${id}. Maybe Company was not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Company with id=" + id,
      });
    });
};

// Delete a Company with the specified id in the request
exports.deleteOffice = (req, res) => {
  if (!req.body.company_id || !req.body.office_id) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const { company_id, office_id } = req.body;

  Company.findById(company_id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Not found Company with id " + company_id });
        return;
      } else {
        let mCompany = data;
        mCompany.offices = mCompany.offices.filter(
          (item) => item.id !== office_id
        );

        Company.findByIdAndUpdate(company_id, mCompany, {
          useFindAndModify: false,
        })
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update Company with id=${company_id}. Maybe Company was not found!`,
              });
            } else res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Company with id=" + company_id,
            });
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Company with id=" + company_id });
    });
};
