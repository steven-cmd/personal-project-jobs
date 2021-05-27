import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSkills } from "../redux/skillReducer";
import Skill from "./Skill";
const natural = require("natural");
const TfIdf = natural.TfIdf;
const proTfidf = new TfIdf();
const tokenizer = new natural.WordTokenizer();

const Pro = (props) => {
  const { skills } = useSelector((store) => store.skillReducer);
  const { jobs } = useSelector((store) => store.jobReducer);
  const dispatch = useDispatch();
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    axios
      .get("/skill/get_skills")
      .then((res) => {
        dispatch(setSkills(res.data));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 511) {
          props.history.push("/auth");
        }
      });
  }, [dispatch, props.history]);

  const handleAddSkill = () => {
    axios
      .post(`/skill/add_skill/${skillInput}`)
      .then((res) => {
        dispatch(setSkills(res.data));
        setSkillInput("");
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteSkill = (skillId) => {
    axios
      .delete(`/skill/delete_skill/${skillId}`)
      .then((res) => dispatch(setSkills(res.data)))
      .catch((err) => console.log(err));
  };

  const dotProduct = (x, y) => {
    //X and Y need to be sorted from most important to least important and same len
    let result = 0;
    for (let i = 0; i < x.length; i++) {
      result += x[i] * y[i];
    }
    return result;
  };

  const normalize = (x) => {
    let result = 0;
    for (let i = 0; i < x.length; i++) {
      result += x[i] ** 2;
    }
    return Math.sqrt(result);
  };

  const cosineSimilarity = (x, y) => {
    return dotProduct(x, y) / (normalize(x) * normalize(y));
  };

  const skillArray = skills.reduce(
    (acc, skill) => [...acc, ...tokenizer.tokenize(skill.skill)],
    []
  );

  for (const job of jobs) {
    proTfidf.addDocument(job.desc[0]);
  }

  proTfidf.addDocument(skillArray);

  const skillVector = proTfidf.listTerms(jobs.length).map((item) => item.tfidf);

  let similarityArr = [];
  for (let i = 0; i < jobs.length; i++) {
    let descVector = [];
    for (let j = 0; j < skillVector.length; j++) {
      descVector.push(proTfidf.listTerms(i)[j].tfidf);
    }
    similarityArr.push(cosineSimilarity(skillVector, descVector));
  }

  const sortedSimilarityEntries = Object.entries({ ...similarityArr }).sort(
    (a, b) => a[1] - b[1]
  );

  return (
    <div>
      <h1>Find your match</h1>
      <h2>My Skills</h2>
      {skills.map((skill) => {
        return (
          <div key={skill.skill_id}>
            <Skill skill={skill} />
            <button onClick={() => handleDeleteSkill(skill.skill_id)}>x</button>
          </div>
        );
      })}
      <input
        placeholder="Add New Skill"
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)}
      ></input>
      <button onClick={handleAddSkill}>+</button>
      <h2>Recommened Jobs</h2>
      <h3>Job 1</h3>
      {jobs[sortedSimilarityEntries[0][0]].name[0]}
      {jobs[sortedSimilarityEntries[0][0]].desc[0]}
      <h3>Job 2</h3>
      {jobs[sortedSimilarityEntries[1][0]].name[0]}
      {jobs[sortedSimilarityEntries[1][0]].desc[0]}
      <h3>Job 3</h3>
      {jobs[sortedSimilarityEntries[1][0]].name[0]}
      {jobs[sortedSimilarityEntries[1][0]].desc[0]}
    </div>
  );
};

export default Pro;
