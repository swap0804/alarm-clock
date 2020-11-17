import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { changeRoute, addAlarm } from "./ClockSlice";
import { useDispatch, useSelector } from "react-redux";

let initialState = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

const AddAlarm = (props) => {
  const dispatch = useDispatch();
  const selectedAlarm = useSelector(({ clock }) => clock.selectedAlarm);
  const [time, handleTimeChange] = useState(
    selectedAlarm !== "" && selectedAlarm.time ? selectedAlarm.time : new Date()
  );
  const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState(initialState);
  const [type, setType] = useState("");
  const [snooze, setSnooze] = useState(false);

  //this function set selectedDays according to type
  useEffect(() => {
    if (type === "everyday") {
      setSelectedDays({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      });
    }
    if (type === "weekends") {
      setSelectedDays({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: true,
        sunday: true,
      });
    }
  }, [type]);

  const handleDateChange = (event) => {
    setSelectedDays({
      ...selectedDays,
      [event.target.name]: event.target.checked,
    });
  };

  //To add Alarm
  const handleSubmit = () => {
    let id = Math.random().toString(36).substring(7);
    let alarm = {
      id: id,
      on: true,
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      name: name,
      days: selectedDays,
      snooze: snooze,
    };
    dispatch(addAlarm(alarm));
    dispatch(changeRoute("list"));
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <Typography variant="h4" className="pb-6">
          {selectedAlarm !== "" ? "Edit Alarm" : "Add Alarm"}
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            fullWidth
            autoOk
            inputVariant="outlined"
            label="Select Time"
            variant="dialog"
            openTo="hours"
            value={time}
            onChange={handleTimeChange}
          />
        </MuiPickersUtilsProvider>
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <div className="flex flex-row">
          <RadioGroup
            row
            aria-label="quiz"
            name="quiz"
            value={type}
            onChange={(ev) => setType(ev.target.value)}
          >
            <FormControlLabel
              value="everyday"
              control={<Radio />}
              label="Everyday"
            />
            <FormControlLabel
              value="weekends"
              control={<Radio />}
              label="Weekends"
            />
          </RadioGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={snooze}
                onChange={(event) => setSnooze(event.target.checked)}
                name="Snooze"
                color="primary"
              />
            }
            label="Snooze"
          />
        </div>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.monday}
                onChange={handleDateChange}
                name="monday"
              />
            }
            label="M"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.tuesday}
                onChange={handleDateChange}
                name="tuesday"
              />
            }
            label="Tu"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.wednesday}
                onChange={handleDateChange}
                name="wednesday"
              />
            }
            label="W"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.thursday}
                onChange={handleDateChange}
                name="thursday"
              />
            }
            label="Th"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.friday}
                onChange={handleDateChange}
                name="friday"
              />
            }
            label="F"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.saturday}
                onChange={handleDateChange}
                name="saturday"
              />
            }
            label="Sa"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDays.sunday}
                onChange={handleDateChange}
                name="sunday"
              />
            }
            label="Su"
          />
        </FormGroup>
        <div className="flex flex-row mt-6 gap-10">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button
            variant="contained"
            onClick={() => dispatch(changeRoute("clock"))}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default React.memo(AddAlarm);
