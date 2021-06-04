import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSkills } from "../redux/skillReducer";
import Skill from "./Skill";
import styled from "styled-components";
const natural = require("natural");
const TfIdf = natural.TfIdf;
const proTfidf = new TfIdf();
const tokenizer = new natural.WordTokenizer();

const SkillCard = styled.div`
  background-color: #d1d1e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 50px 10px 50px;
  border-radius: 3px;
`;

const CardTagDiv = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const JobCardDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeleteButton = styled.button`
  background: #e45858;
  border: 2px solid #e45858;
  color: #fffffe;
  :hover {
    cursor: pointer;
    filter: brightness(90%);
  }
  border-radius: 0px 3px 3px 0px;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmButton = styled.button`
  background: #fffffe;
  border: 2px solid #fffffe;
  color: #2b2c34;
  :hover {
    cursor: pointer;
    filter: brightness(90%);
  }
  border-radius: 0px 3px 3px 0px;
`;

const Input = styled.input`
  border: none;
  font-size: 16.5px;
  padding-left: 10px;
  border-radius: 3px 0px 0px 3px;
  :focus {
    outline: none;
  }
`;

const Job = styled.div`
  border-radius: 3px;
  margin: 0px 60px 60px 60px;
  background-color: #d1d1e9;
  padding: 20px;
`;

const AddSkillDiv = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const Pro = (props) => {
  const { skills } = useSelector((store) => store.skillReducer);
  const { jobs } = useSelector((store) => store.jobReducer);
  const dispatch = useDispatch();
  const [skillInput, setSkillInput] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const history = useHistory();
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
      .catch((err) => {
        console.log(err);
        alert("Skill already exists.");
      });
  };

  const handleDeleteSkill = (skillId) => {
    axios
      .delete(`/skill/delete_skill/${skillId}`)
      .then((res) => {
        dispatch(setSkills(res.data));
      })
      .catch((err) => {
        console.log(err);
        history.push("/Auth");
      });
  };

  const handleRecommend = () => {
    const skillArray = skills.reduce(
      (acc, skill) => [...acc, ...tokenizer.tokenize(skill.skill)],
      []
    );

    for (const job of jobs) {
      proTfidf.addDocument(handleHTML(job.desc[0]));
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

    const topHalfJobs = sortedScores.slice(
      0,
      Math.ceil(sortedScores.length / 2)
    );

    setRecommendedJobs(topHalfJobs);
  };

  const handleHTML = (htmlString) => {
    return htmlString.toString().replace(/(<([^>]+)>)/gi, "");
  };

  return (
    <MainDiv>
      <h1>Find Jobs</h1>
      <SkillCard>
        <h2>My Skills</h2>
        {skills.map((skill) => {
          return (
            <div key={skill.skill_id}>
              <CardTagDiv>
                <Skill skill={skill} />
                <DeleteButton onClick={() => handleDeleteSkill(skill.skill_id)}>
                  x
                </DeleteButton>
              </CardTagDiv>
            </div>
          );
        })}
        <AddSkillDiv>
          <Input
            placeholder="Add New Skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          ></Input>
          <ConfirmButton onClick={handleAddSkill}>+</ConfirmButton>
        </AddSkillDiv>
      </SkillCard>

      <h2>Recommended Jobs</h2>
      <JobCardDiv>
        {recommendedJobs.map((item) => (
          <Job>
            <Link to={`/jobdetail/${jobs[item[0]].id}`} key={jobs[item[0]].id}>
              <div>
                <h3>{jobs[item[0]].title}</h3>
                <p>{handleHTML(jobs[item[0]].desc)}</p>
              </div>
            </Link>
          </Job>
        ))}
      </JobCardDiv>
    </MainDiv>
  );
};

export default Pro;
