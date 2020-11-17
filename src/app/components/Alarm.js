import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeRoute,
  snoozeAlarm,
  toggleAlarm,
  selectAlarm,
} from "./ClockSlice";
import soundfile from "../../assets/audio/Daybreak.mp3";

//Page Display when alarm triggers
const Alarm = (props) => {
  const dispatch = useDispatch();
  const selectedAlarm = useSelector(({ clock }) => clock.selectedAlarm);
  const [audio] = useState(new Audio(soundfile));

  //functio to play sound when page loads
  useEffect(() => {
    audio.play();
    return () => {};
  }, []);

  return (
    <div className="flex w-full h-full items-center justify-center bg-red-600">
      <div className="flex flex-col gap-10">
        <Typography variant="h1">{selectedAlarm.time}</Typography>
        {selectedAlarm.name.length > 0 ? (
          <Typography variant="h6" style={{ textAlign: "center" }}>
            {selectedAlarm.name}
          </Typography>
        ) : null}
        <div className="flex flex-row gap-20 mt-10">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              audio.pause();
              dispatch(toggleAlarm(selectedAlarm.id));
              dispatch(selectAlarm(""));
              dispatch(changeRoute("clock"));
              props.close();
            }}
          >
            Stop
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => audio.pause()}
          >
            Silent
          </Button>
          {selectedAlarm.snooze ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                audio.pause();
                dispatch(snoozeAlarm(selectedAlarm));
                dispatch(selectAlarm(""));
                dispatch(changeRoute("list"));
              }}
            >
              Snooze
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Alarm;
