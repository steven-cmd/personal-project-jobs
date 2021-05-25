module.exports = {
  add_skill: (req, res) => {
    const db = req.app.get("db");
    const { user } = req.session;
    const { skill } = req.params;
    if (!user) {
      return res.status(511).send("not logged in");
    }
    db.skills.check_if_skill_exists(skill).then((returnedSkill) => {
      if (returnedSkill[0]) {
        db.skills
          .check_if_user_has_skill(user.id, returnedSkill[0].id)
          .then((usersSkill) => {
            if (!usersSkill[0]) {
              db.skills
                .add_skill_to_user(user.id, returnedSkill[0].id)
                .then((userSkills) => {
                  return res.status(200).send(userSkills);
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).send(err);
                });
            } else {
              return res.status(405).send("Already have that skill");
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err);
          });
      } else {
        db.skills.add_skill(skill).then((returnedSkill) => {
          db.skills
            .check_if_user_has_skill(user.id, returnedSkill[0].id)
            .then((usersSkill) => {
              if (!usersSkill[0]) {
                db.skills
                  .add_skill_to_user(user.id, returnedSkill[0].id)
                  .then((userSkills) => {
                    return res.status(200).send(userSkills);
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(500).send(err);
                  });
              } else {
                return res.status(405).send("Already have that skill");
              }
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
