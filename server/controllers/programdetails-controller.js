// Import database
const knex = require("../db");

exports.insertProgramDetails = async (req, res) => {
  req.body.formValues.map(field => {
    knex("programdetails")
    .insert({
      // insert new record, a user
      lessonname: field.lessonname,
      notificationfile: field.notificationfile,
      starttime: new Date(field.starttime).toLocaleTimeString(),
      endtime: new Date(field.endtime).toLocaleTimeString(),
      programid: req.body.programid
    })
    .then((data) => {
      // Send a success message in response
      res.json({ message: `Program Details eklendi` });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `Program Details eklenemedi! Hata: ${err}` });
    });
  })
};
