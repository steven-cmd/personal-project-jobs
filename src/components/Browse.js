import { useSelector } from "react-redux";
import styled from "styled-components";
import { useState, useEffect } from "react";
const natural = require("natural");
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();
const descTfidf = new TfIdf();

const MainDiv = styled.div`
  background-color: #fffffe;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TermDiv = styled.div`
  background-color: #d1d1e9;
  margin: 5px;
  border-left: 3px solid #e45858;
  padding 3px;
  color: #2b2c34;
`;

const TermWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Browse = () => {
  const { jobs } = useSelector((store) => store.jobReducer);

  useEffect(() => {
    handleTopTerms();
  }, [jobs]);

  const [top20CommonTitleTerms, setTop20CommonTitleTerms] = useState([]);
  const [top100CommonDescriptors, setTop100CommonDescriptors] = useState([]);
  const [top100ImportantDescriptors, setTop100ImportantDescriptors] = useState(
    []
  );

  const handleHTML = (htmlString) => {
    return htmlString.toString().replace(/(<([^>]+)>)/gi, "");
  };

  const handleTopTerms = () => {
    for (const job of jobs) {
      tfidf.addDocument(job.name[0]);
      descTfidf.addDocument(handleHTML(job.desc[0]));
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

    setTop20CommonTitleTerms(sortedTitleTfidfs.slice(0, 20));
    setTop100CommonDescriptors(sortedDescTfidfs.slice(0, 100));
    setTop100ImportantDescriptors(sortedDescTfidfs.slice(-100));
  };

  return (
    <MainDiv>
      <h1>Discover what tech skills employers want right now</h1>
      <h2>Common Job Title Terms</h2>
      <TermWrapper>
        {top20CommonTitleTerms.map((term, index) => (
          <TermDiv key={term[0] + index + term[1]}>
            <p>{term[0]}</p>
          </TermDiv>
        ))}
      </TermWrapper>
      <h2>Common Job Descriptors</h2>
      <TermWrapper>
        {top100CommonDescriptors.map((term, index) => (
          <TermDiv key={term[0] + index + term[1]}>
            <p>{term[0]}</p>
          </TermDiv>
        ))}
      </TermWrapper>

      <h2>Specialized Job Descriptors</h2>
      <TermWrapper>
        {top100ImportantDescriptors.map((term, index) => (
          <TermDiv key={term[0] + index + term[1]}>
            <p>{term[0]}</p>
          </TermDiv>
        ))}
      </TermWrapper>
    </MainDiv>
  );
};

export default Browse;
