import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSkills } from "../redux/skillReducer";

const Skill = (props) => {
  const [isInput, setIsInput] = useState(false);
  const [skillInput, setSkillInput] = useState(props.skill.skill);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsInput(!isInput);
  };

  const handleEditSubmit = () => {
    axios
      .put(`/skill/change_skill/${props.skill.skill_id}`, { skillInput })
      .then((res) => {
        dispatch(setSkills(res.data));
        handleToggle();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {isInput ? (
        <>
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          ></input>
          <button onClick={handleEditSubmit}>✓</button>
        </>
      ) : (
        <button onClick={handleToggle}>{props.skill.skill}</button>
      )}
    </div>
  );
};

export default Skill;
