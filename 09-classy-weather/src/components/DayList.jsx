import React from "react";

class DayList extends React.Component {
  constructor(props) {
    super(props);
  }

  getWeatherIcon = (wmoCode) => {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  };

  formatDay = (dateStr) => {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  };

  render() {
    const { date, max, code, min, isToday } = this.props;

    return (
      <li className="day">
        <span>{this.getWeatherIcon(code)}</span>
        <p>{isToday ? "today" : this.formatDay(date)}</p>
        <p>
          {Math.floor(min)} - {Math.ceil(max)}
        </p>
      </li>
    );
  }
}

export default DayList;
