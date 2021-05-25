const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const [isUser] = await db.users.get_user_by_email(email);
    if (isUser) {
      return res.status(409).send("email already exists");
    }
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    const [user] = await db.users.create_user(email, hash);
    delete user.password;
    req.session.user = user;
    return res.status(200).send(req.session.user);
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const [user] = await db.users.get_user_by_email(email);
    if (!user) {
      return res.status(401).send("no such email");
    }
    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if (!isAuthenticated) {
      return res.status(403).send("wrong password");
    }
    delete user.password;
    req.session.user = user;
    return res.status(200).send(req.session.user);
  },
  getUser: (req, res) => {
    if (!req.session.user) {
      return res.status(404).send("no such user");
    }
    return res.status(200).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },
};
