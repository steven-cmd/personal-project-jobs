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
  const [recommendedJobs, setRecommendedJobs] = useState([]);

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

  useEffect(() => {
    handleRecommend();
  }, [skills, jobs]);

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
      .then((res) => {
        dispatch(setSkills(res.data));
      })
      .catch((err) => console.log(err));
  };

  const handleRecommend = () => {
    const skillArray = skills.reduce(
      (acc, skill) => [...acc, ...tokenizer.tokenize(skill.skill)],
      []
    );

    for (const job of jobs) {
      proTfidf.addDocument(job.desc[0]);
    }

    proTfidf.addDocument(skillArray);

    let scores = [];
    for (let i = 0; i < jobs.length; i++) {
      let itemScore = 0;
      for (let item of proTfidf.listTerms(i)) {
        if (skillArray.includes(item.term)) {
          itemScore += item.tfidf;
        }
      }
      scores.push(itemScore);
    }

    const sortedScores = Object.entries({ ...scores }).sort(
      (a, b) => b[1] - a[1]
    );

    const topHalfJobs = sortedScores.slice(0, sortedScores.length / 2);

    setRecommendedJobs(topHalfJobs);
  };

  const stripHTML = (htmlString) => {
    return htmlString.toString().replace(/(<([^>]+)>)/gi, "");
  };

  return (
    <div>
      <h1>Find Jobs</h1>
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
      {recommendedJobs.map((item) => (
        <div key={jobs[item[0]].id}>
          <h3>{jobs[item[0]].title}</h3>
          <p>{stripHTML(jobs[item[0]].desc)}</p>
          <a href={jobs[item[0]].url}>Apply Now</a>
        </div>
      ))}
    </div>
  );
};

export default Pro;
