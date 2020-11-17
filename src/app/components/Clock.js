import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeRoute } from "./ClockSlice";
import moment from "moment";

const Clock = (props) => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(moment().format("LTS"));

  useEffect(() => {
    const interval = setInterval(() => {
      let time = moment().format("LTS");
      setCurrentTime(time);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // const liveTime = () => {
  //   time = new Date().toLocaleTimeString();
  //   setCurrentTime(time);
  // };

  // setInterval(() => {
  //   liveTime();
  // }, 1000);

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center gap-12">
        <Typography variant="h1" className="font-bold">
          {currentTime}
        </Typography>
        <div className="flex justify-between gap-12">
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(changeRoute("list"))}
          >
            Alarms
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(changeRoute("add"))}
          >
            Add Alarm
          </Button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Clock);
