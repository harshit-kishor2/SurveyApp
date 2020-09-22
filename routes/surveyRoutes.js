const _ = require("lodash");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const requireCredit = require("../middleware/requireCredits");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Mailer = require("../services/Mailer");
const { Path } = require("path-parser");
const Survey = mongoose.model("survey");
module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Hey thanks for your feedback");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    //check all event
    const p = new Path("/api/surveys/:surveyId/:choice");
    //filter correct event
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice,
          };
        }
      })
      //remove duplication (only single click)
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();
  });

  app.post("/api/surveys", requireLogin, requireCredit, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => ({ email })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    //after createing servey send email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      //mail send
      await mailer.send();
      //survey save
      await survey.save();
      //decrement credits
      req.user.credits -= 1;
      //save user database
      const user = await req.user.save();
      //send updated user model
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(422).send({ error: "error found" + err });
    }
  });
};
