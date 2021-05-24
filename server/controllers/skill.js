module.exports = {
  add_skill: (req, res) => {
    const db = req.app.get("db");
    const { user } = req.session;
    const { skill } = req.params;
    if (!user) {
      return res.status(511).send("not logged in");
    }
    db.skills.check_if_skill_exists(skill).then((returnedSkill) => {
      if (returnedSkill.id) {
        db.skills
          .add_skill_to_user(user.id, returnedSkill.id)
          .then((userSkills) => {
            return res.status(200).send(userSkills);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err);
          });
      } else {
        db.skills.add_skill(skill).then((returnedSkill) => {
          db.skills
            .add_skill_to_user(user.id, returnedSkill.id)
            .then((userSkills) => {
              return res.status(200).send(userSkills);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send(err);
            });
        });
      }
    });
  },
  get_skills: (req, res) => {
    const db = req.app.get("db");
    const { user } = req.session;
    if (!user) {
      return res.status(511).send("not logged in");
    }
    db.skills
      .get_skills(user.id)
      .then((skills) => {
        res.status(200).send(skills);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  change_skill: (req, res) => {
    const db = req.app.get("db");
    const { user } = req.session;
    const { skill_id } = req.params;
    const { newSkill } = req.body;
    if (!user) {
      return res.status(511).send("not logged in");
    }
    db.skills.check_if_skill_exists(newSkill).then((returnedSkill) => {
      if (returnedSkill.id) {
        db.skills
          .edit_skill(returnedSkill.id, skill_id)
          .then((skills) => {
            return res.status(200).send(skills);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err);
          });
      } else {
        db.skills.add_skill(newSkill).then((newSkillObj) => {
          db.skills
            .edit_skill(newSkillObj.id, skill_id)
            .then((skills) => {
              return res.status(200).send(skills);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send(err);
            });
        });
      }
    });
  },
  delete_skill: (req, res) => {
    const db = req.app.get("db");
    const { user } = req.session;
    const { skill_id } = req.params;
    if (!user) {
      return res.status(511).send("not logged in");
    }
    db.skills
      .delete_skill(skill_id, user.id)
      .then((skills) => {
        return res.status(200).send(skills);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },
};
