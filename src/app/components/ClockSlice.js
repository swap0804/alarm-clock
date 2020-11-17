import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const clockSlice = createSlice({
  name: "clock",
  initialState: {
    alarmList: [
      {
        id: "ifq49",
        on: false,
        time: "08:00 AM",
        name: "Good Morning",
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        },
        snooze: true,
      },
      {
        id: "q8thql",
        on: false,
        time: "09:00 AM",
        name: "Alarm 1",
        days: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: true,
          sunday: true,
        },
        snooze: false,
      },
      {
        id: "t79p0f",
        on: false,
        time: "10:00 PM",
        name: "Swaroop",
        days: {
          monday: false,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: false,
          saturday: false,
          sunday: false,
        },
        snooze: false,
      },
    ],
    route: "clock",
    selectedAlarm: "",
  },
  reducers: {
    changeRoute: (state, action) => {
      state.route = action.payload;
    },
    addAlarm: (state, action) => {
      state.alarmList.push(action.payload);
    },
    selectAlarm: (state, action) => {
      state.selectedAlarm = action.payload;
    },
    toggleAlarm: (state, action) => {
      let newList = [...state.alarmList];
      newList.forEach((item) => {
        if (item.id === action.payload) {
          item.on = item.on === true ? false : true;
        }
      });
      state.alarmList = newList;
    },
    deleteAlarm: (state, action) => {
      if (state.alarmList.length) {
        const list = state.alarmList.filter(
          (alarm) => alarm.id !== action.payload.id
        );
        state.alarmList = list;
      }
    },
    snoozeAlarm: (state, action) => {
      if (state.alarmList.length) {
        let newList = JSON.parse(JSON.stringify(state.alarmList));
        newList.forEach((item) => {
          if (item.id === action.payload.id) {
            let newTime = moment
              .utc(item.time, "hh:mm A")
              .add(10, "minutes")
              .format("hh:mm A");

            item.time = newTime;
          }
        });
        state.alarmList = newList;
      }
    },
  },
});

export const {
  changeRoute,
  addAlarm,
  selectAlarm,
  toggleAlarm,
  deleteAlarm,
  snoozeAlarm,
} = clockSlice.actions;

export default clockSlice.reducer;
