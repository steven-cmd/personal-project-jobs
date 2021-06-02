import { useSelector } from "react-redux";
import ReactWordcloud from "react-wordcloud";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
const natural = require("natural");
const TfIdf = natural.TfIdf;
const jobTfidf = new TfIdf();
const size = [375, 375];
const options = {
  fontFamily: "sans-serif",
  fontSizes: [20, 100],
};

const tfidfBarOptions = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Top Terms (Specificity / TF-IDF)",
    },
  },
};

const JobDetail = (props) => {
  const { jobs } = useSelector((store) => store.jobReducer);

  useEffect(() => {
    getIndex();
  }, [jobs]);

  const [words, setWords] = useState([]);
  const [jobIndex, setJobIndex] = useState(null);
  const [labels, setLabels] = useState([]);
  const [barData, setBarData] = useState([]);

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

    const theWords = jobTfidf.listTerms(index).map((word) => {
      return { text: word.term, value: word.tfidf };
    });
    setWords(theWords);

    const theLabels = Object.values(theWords)
      .slice(0, 12)
      .map((word) => word.text);

    setLabels(theLabels);

    const theBarData = Object.values(theWords)
      .slice(0, 12)
      .map((word) => word.value);

    setBarData(theBarData);
  };

  const tfidfBarData = {
    labels: labels,
    datasets: [
      {
        label: "TF-IDF",
        data: barData,
        borderWidth: 1,
      },
    ],
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
        <Bar data={tfidfBarData} options={tfidfBarOptions} />
      </div>
    </div>
  );
};

export default JobDetail;
