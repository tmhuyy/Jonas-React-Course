import React from "react";
class Input extends React.Component {
  render() {
    const { placeholder, value, onChangeLocation } = this.props;
    return (
      <div>
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeLocation(e.target.value)}
        />
      </div>
    );
  }
}

export default Input;
