const axios = require("axios");
const parseString = require("xml2js").parseString;

module.exports = {
  get_data: (req, res) => {
    axios
      .get("https://devitjobs.uk/job_feed.xml")
      .then((data) => {
        parseString(data.data, function (err, result) {
          if (err) {
            return res.status(500).send(err);
          }

          return res.status(200).send(result);
        });
      })
      .catch((err) => console.log(err));
  },
};
