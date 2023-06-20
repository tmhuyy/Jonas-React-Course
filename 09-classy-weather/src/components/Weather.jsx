import React from "react";
import DayList from "./DayList";

class Weather extends React.Component {
  render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = this.props.weather;
    return (
      <div>
        <h2>Weather For {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, index) => (
            <DayList
              key={date}
              date={date}
              max={max.at(index)}
              min={min.at(index)}
              code={codes.at(index)}
              isToday={index === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Weather;
