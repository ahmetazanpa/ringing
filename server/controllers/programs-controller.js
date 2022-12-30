// Import database
const knex = require("../db");

function getDayName(locale)
{
    var date = new Date();
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

exports.getAllPrograms = async (req, res) => {
  knex
    .select(
      knex.raw(`json_object('id', p3.id, 'programname', p3.programname, 'programday', p3.programday, 'username', p3.username,
      'programdetails', (SELECT json_group_array(json_object('id', p4.id, 'lessonname', p4.lessonname, 'notificationfile', p4.notificationfile, 'starttime', p4.starttime, 'endtime', p4.endtime))
      FROM programdetails p4 WHERE p4.programid = p3.id))`)
    )
    .from("programs as p3")
    .then((rows) => {
      // Send a success message in response
      res.json(rows);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `Tüm programa ulaşılamadı! Hata: ${err}` });
    });
};

exports.getTodayPrograms = async (req, res) => {
  knex
    .select("*")
    .from("programs")
    .innerJoin("programdetails", "programs.id", "programdetails.programid")
    .where("programs.programday", "like", `${ getDayName("tr-TR") }`)
    .then((todayprogram) => {
      // Send a success message in response
      res.json(todayprogram)
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `Günün programı datasına ulaşılamadı! Hata: ${err}` });
    });
};

exports.insertProgram = async (req, res) => {
  knex("programs")
    .insert({
      // insert new record, a user
      programname: req.body.title,
      programday: req.body.days,
      username: req.body.username,
    })
    .then((data) => {
      // Send a success message in response
      res.json({ id: data[0], message: `Program eklendi` });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `Program eklenemedi! Hata: ${err}` });
    });
};

exports.deleteProgram = async (req, res) => {
  knex("programs")
    .where('id', req.params.id)
    .join('programs', 'programs.id', 'programdetails.programid')
    .del()
    .then((data) => {
      // Send a success message in response
      res.json({ message: `Program Silindi` });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `Program silinemedi! Hata: ${err}` });
    });
};
