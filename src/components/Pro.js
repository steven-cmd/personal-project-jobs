import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSkills } from "../redux/skillReducer";

const Pro = (props) => {
  const { skills } = useSelector((store) => store.skillReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/skill/get_skills")
      .then((res) => {
        console.log(res);
        dispatch(setSkills(res.data));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 511) {
          props.history.push("/auth");
        }
      });
  }, [dispatch]);

  return <div>Look at pro</div>;
};

export default Pro;
