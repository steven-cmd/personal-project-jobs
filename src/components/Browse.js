import { useSelector } from "react-redux";
const natural = require("natural");
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();
const descTfidf = new TfIdf();

const Browse = () => {
  const { jobs } = useSelector((store) => store.jobReducer);
  console.log("jobs", jobs);

  for (const job of jobs) {
    tfidf.addDocument(job.name[0]);
    descTfidf.addDocument(job.desc[0]);
  }

  const titleTfidfs = {};
  const descTfidfs = {};

  for (let i = 0; i < jobs.length; i++) {
    tfidf.listTerms(i).forEach(function (item) {
      titleTfidfs[item.term] = item.tfidf;
    });

    descTfidf.listTerms(i).forEach(function (item) {
      descTfidfs[item.term] = item.tfidf;
    });
  }

  const sortedTitleTfidfs = Object.entries(titleTfidfs).sort(
    (a, b) => a[1] - b[1]
  );

  const sortedDescTfidfs = Object.entries(descTfidfs).sort(
    (a, b) => a[1] - b[1]
  );

  const top20CommonTitleTerms = sortedTitleTfidfs.slice(0, 20);
  const top100CommonDescriptors = sortedDescTfidfs.slice(0, 100);
  const top100ImportantDescriptors = sortedDescTfidfs.slice(-100);
  return (
    <div>
      <h1>Discover what software skills employers want right now</h1>
      <h2>Common Job Title Terms</h2>
      {top20CommonTitleTerms.map((term, index) => (
        <p key={term[0] + index + term[1]}>{term[0]}</p>
      ))}
      <h2>Common Job Descriptors</h2>
      {top100CommonDescriptors.map((term, index) => (
        <p key={term[0] + index + term[1]}>{term[0]}</p>
      ))}
      <h2>Specialized Job Descriptors</h2>
      {top100ImportantDescriptors.map((term, index) => (
        <p key={term[0] + index + term[1]}>{term[0]}</p>
      ))}
    </div>
  );
};

export default Browse;
