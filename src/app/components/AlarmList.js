import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import { selectAlarm, changeRoute, toggleAlarm } from "./ClockSlice";

const AlarmList = () => {
  const dispatch = useDispatch();
  const list = useSelector(({ clock }) => clock.alarmList);
  let alarmDays = "";
  const checkDays = (days) => {
    // function to assign secondary text
    if (allTrue(days)) {
      alarmDays = "Everyday";
    } else if (allFalse(days)) {
      alarmDays = "Singleday";
    } else if (
      days.monday === false &&
      days.tuesday === false &&
      days.wednesday === false &&
      days.thursday === false &&
      days.friday === false &&
      days.saturday === true &&
      days.sunday === true
    ) {
      alarmDays = "Weekends";
    } else {
      alarmDays = "Weekdays";
    }
  };
  const allTrue = (obj) => {
    //to check all days are true
    for (var o in obj) if (!obj[o]) return false;
    return true;
  };
  const allFalse = (obj) => {
    //to check all days are False
    for (var o in obj) if (obj[o]) return false;
    return true;
  };
  return (
    <>
      <div className="flex flex-col gap-10">
        {list.length ? (
          <List
            component="nav"
            style={{ maxHeight: "70vh", width: "25vw", overflow: "auto" }}
          >
            {list.map((item) => (
              <ListItem
                button
                // To edit alarm
                // onClick={() => {
                //   dispatch(selectAlarm(item));
                //   dispatch(changeRoute("add"));
                // }}
              >
                {checkDays(item.days)}
                <ListItemIcon>
                  <AccessAlarmsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="h6">{item.time}</Typography>}
                  secondary={alarmDays}
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={item.on}
                    onChange={() => dispatch(toggleAlarm(item.id))}
                    color="primary"
                    name="checkedB"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="h4" style={{ textAlign: "center" }}>
            No Alarms
          </Typography>
        )}
        <div className="flex gap-10">
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(changeRoute("add"))}
          >
            Add Alarm
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(changeRoute("clock"))}
          >
            Clock
          </Button>
        </div>
      </div>
    </>
  );
};

export default AlarmList;
