import { useSelector } from "react-redux";
const natural = require("natural");
const TfIdf = natural.TfIdf;
const jobTfidf = new TfIdf();

const JobDetail = (props) => {
  const { jobs } = useSelector((store) => store.jobReducer);

  const handleHTML = (htmlString) => {
    return htmlString.toString().replace(/(<([^>]+)>)/gi, "");
  };

  const jobIndex = jobs.findIndex((job) => job.id[0] === props.match.params.id);

  for (const job of jobs) {
    jobTfidf.addDocument(handleHTML(job.desc[0]));
  }
  console.log(jobs[jobIndex]);
  return (
    <div>
      <h2>{jobs[jobIndex].title}</h2>
      <p>{jobs[jobIndex].company}</p>
      <p>
        {jobs[jobIndex].location}, {jobs[jobIndex].country}
      </p>
      <a href={jobs[jobIndex].url}>Apply</a>
      {jobTfidf.listTerms(jobIndex).map((word) => (
        <div>
          <h3>{word.term} </h3>
          <p>Frequency :{word.tf} </p>
          <p>Specificity Score: {word.tfidf} </p>
        </div>
      ))}
    </div>
  );
};

export default JobDetail;
