import { useSelector } from "react-redux";
import ReactWordcloud from "react-wordcloud";
import { useState, useEffect } from "react";
const natural = require("natural");
const TfIdf = natural.TfIdf;
const jobTfidf = new TfIdf();
const size = [375, 375];
const options = {
  fontFamily: "sans-serif",
  fontSizes: [20, 100],
};

const JobDetail = (props) => {
  const { jobs } = useSelector((store) => store.jobReducer);

  useEffect(() => {
    getIndex();
  }, [jobs]);

  const [words, setWords] = useState([]);
  const [jobIndex, setJobIndex] = useState(null);

  const handleHTML = (htmlString) => {
    return htmlString.toString().replace(/(<([^>]+)>)/gi, "");
  };

  const getIndex = () => {
    const theIndex = jobs.findIndex(
      (job) => job.id[0] === props.match.params.id
    );

    setJobIndex(theIndex);
    getWords(theIndex);
  };

  const getWords = (index) => {
    for (const job of jobs) {
      jobTfidf.addDocument(handleHTML(job.desc[0]));
    }

    console.log(index);
    const theWords = jobTfidf.listTerms(index).map((word) => {
      console.log("it dos");
      return { text: word.term, value: word.tfidf };
    });

    console.log(theWords);
    setWords(theWords);
  };

  return (
    <div>
      <div>
        <h2>{jobs[jobIndex]?.title}</h2>
        <p>{jobs[jobIndex]?.company}</p>
        <p>
          {jobs[jobIndex]?.location}, {jobs[jobIndex]?.country}
        </p>
        <a href={jobs[jobIndex]?.url}>Apply</a>
        <ReactWordcloud words={words} options={options} size={size} />
      </div>
    </div>
  );
};

export default JobDetail;
