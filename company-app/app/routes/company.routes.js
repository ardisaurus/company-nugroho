module.exports = (app) => {
  const company = require("../controllers/company.controller.js");
  var router = require("express").Router();
  router.get("/", company.findAll);
  router.get("/:id", company.findOne);
  router.post("/", company.createCompany);
  router.delete("/:id", company.deleteCompany);
  router.put("/addoffice", company.createOffice);
  router.put("/deleteoffice", company.deleteOffice);
  app.use("/api/company", router);
};
