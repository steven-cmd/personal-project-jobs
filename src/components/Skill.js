import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSkills } from "../redux/skillReducer";
import styled from "styled-components";

const TagButton = styled.button`
  background: #6246ea;
  border: 2px solid #6246ea;
  color: #fffffe;
  :hover {
    cursor: pointer;
    filter: brightness(90%);
  }
  font-weight: bold;
  border-radius: 3px 0px 0px 3px;
`;

const ConfirmButton = styled.button`
  background: #fffffe;
  border: 2px solid #fffffe;
  color: #2b2c34;
  :hover {
    cursor: pointer;
    filter: brightness(90%);
  }
`;

const Input = styled.input`
  border: none;
  font-size: 16.7px;
  padding-left: 10px;
  border-radius: 3px 0px 0px 3px;
  :focus {
    outline: none;
  }
  width: 140px;
`;

const Skill = (props) => {
  const [isInput, setIsInput] = useState(false);
  const [skillInput, setSkillInput] = useState(props.skill.skill);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsInput(!isInput);
  };

  const handleEditSubmit = () => {
    if (skillInput.length > 64) {
      alert("Please enter a skill less than 64 charactres in length.");
    } else {
      axios
        .put(`/skill/change_skill/${props.skill.skill_id}`, { skillInput })
        .then((res) => {
          dispatch(setSkills(res.data));
          handleToggle();
        })
        .catch((err) => {
          console.log(err);
          handleToggle();
        });
    }
  };

  return (
    <div>
      {isInput ? (
        <>
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          ></Input>
          <ConfirmButton onClick={handleEditSubmit}>✓</ConfirmButton>
        </>
      ) : (
        <TagButton onClick={handleToggle}>{props.skill.skill}</TagButton>
      )}
    </div>
  );
};

export default Skill;
