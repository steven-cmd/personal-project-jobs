import { useSelector } from "react-redux";
import ReactWordcloud from "react-wordcloud";
import { useState, useEffect, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { useParams } from "react-router";
const natural = require("natural");
const TfIdf = natural.TfIdf;
const jobTfidf = new TfIdf();
const size = [411, 411];
const options = {
  fontFamily: "sans-serif",
  fontSizes: [12, 50],
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
      position: "bottom",
    },
    title: {
      display: true,
      text: "Top Terms (Specificity)",
    },
  },
};

const Apply = styled.div`
  background-color: #6246ea;
  color: #fffffe;
  :hover {
    filter: brightness(90%);
  }
  margin: 5px;
  border-radius: 3px;
  border: 2px solid #6246ea;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MainDiv = styled.div`
  background-color: #fffffe;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 800px) {
    padding: 0px 40px 0px 40px;
  }
`;

const JobDetail = (props) => {
  const { jobs } = useSelector((store) => store.jobReducer);
  const { id } = useParams();

  const getIndex = useCallback(() => {
    const theIndex = jobs.findIndex((job) => job.id[0] === id);

    for (const job of jobs) {
      jobTfidf.addDocument(handleHTML(job.desc[0]));
    }

    const theWords = jobTfidf.listTerms(theIndex).map((word) => {
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

    setJobIndex(theIndex);
  }, [jobs, id]);

  useEffect(() => {
    getIndex();
  }, [getIndex]);

  const [words, setWords] = useState([]);
  const [jobIndex, setJobIndex] = useState(null);
  const [labels, setLabels] = useState([]);
  const [barData, setBarData] = useState([]);

  const handleHTML = (htmlString) => {
    return htmlString.toString().replace(/(<([^>]+)>)/gi, "");
  };

  const tfidfBarData = {
    labels: labels,
    datasets: [
      {
        label: "TF-IDF",
        data: barData,
        backgroundColor: ["rgba(98, 70, 234, 1)"],
        borderColor: ["rgba(98, 70, 234, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <MainDiv>
      <h2>{jobs[jobIndex]?.title}</h2>
      <p>{jobs[jobIndex]?.company}</p>
      <p>
        {jobs[jobIndex]?.location}, {jobs[jobIndex]?.country}
      </p>

      <a target={"_blank"} rel="noreferrer" href={jobs[jobIndex]?.url}>
        <Apply>Apply</Apply>
      </a>

      <div>
        <ReactWordcloud words={words} options={options} size={size} />
      </div>
      <Bar data={tfidfBarData} options={tfidfBarOptions} />
    </MainDiv>
  );
};

export default JobDetail;
