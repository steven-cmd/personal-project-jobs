import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSkills } from "../redux/skillReducer";
import Skill from "./Skill";

const Pro = (props) => {
  const { skills } = useSelector((store) => store.skillReducer);
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

  return (
    <div>
      <p>My Skills</p>
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
    </div>
  );
};

export default Pro;
