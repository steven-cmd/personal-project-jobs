import { useSelector } from "react-redux";
const natural = require("natural");
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

const Browse = () => {
  const { jobs } = useSelector((store) => store.jobReducer);

  for (const job of jobs) {
    tfidf.addDocument(job.name[0]);
  }

  const titleTfidf = new Set();

  for (let i = 0; i < jobs.length; i++) {
    tfidf.listTerms(i).forEach(function (item) {
      console.log(item.term + ": " + item.tfidf);
    });
  }

  return <div>Look at browse</div>;
};

export default Browse;
