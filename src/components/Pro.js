import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSkills } from "../redux/skillReducer";

const Pro = (props) => {
  const { skills } = useSelector((store) => store.skillReducer);
  const dispatch = useDispatch();
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    axios
      .get("/skill/get_skills")
      .then((res) => {
        console.log(res.data);
        dispatch(setSkills(res.data));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 511) {
          props.history.push("/auth");
        }
      });
  }, [dispatch]);

  const handleAddSkill = () => {
    axios.post(`/skill/add_skill/${skillInput}`).then().catch();
  };

  const handleDeleteSkill = () => {};

  return (
    <div>
      <p>My Skills</p>
      {skills.map((skill) => {
        <button>{skill}</button>;
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
