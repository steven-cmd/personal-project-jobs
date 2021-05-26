import { useSelector } from "react-redux";

const Browse = () => {
  const { jobs } = useSelector((store) => store.jobReducer);
  console.log(jobs);
  return (
    <div>
      Look at browse
      {jobs.map((job) => {
        return <p>{job.name}</p>;
      })}
    </div>
  );
};

export default Browse;
