import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Clock from "./Clock";
import AddAlarm from "./AddAlarm";
import AlarmList from "./AlarmList";
import Alarm from "./Alarm";
import { selectAlarm } from "./ClockSlice";

const Main = (props) => {
  const dispatch = useDispatch();
  const route = useSelector(({ clock }) => clock.route);
  const alarmList = useSelector(({ clock }) => clock.alarmList);
  const [trigger, setTrigger] = useState(false);

  //to check every 10 seconds local time and alarms time
  //we can set that 1 second also
  useEffect(() => {
    const interval = setInterval(() => {
      let time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (alarmList.length) {
        alarmList.forEach((alarm) => {
          if (alarm.on) {
            if (alarm.time === time) {
              dispatch(selectAlarm(alarm));
              setTrigger(true);
            }
          }
        });
      }
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [alarmList]);

  //To close page
  const handleClose = () => {
    setTrigger(false);
  };

  return (
    <>
      <div className="flex flex-1 h-screen items-center justify-center">
        {trigger ? (
          <Alarm close={handleClose} />
        ) : route === "add" ? (
          <AddAlarm />
        ) : route === "list" ? (
          <AlarmList />
        ) : (
          <Clock />
        )}
      </div>
    </>
  );
};

export default Main;
