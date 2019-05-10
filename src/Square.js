import React from "react";

export class Square extends React.Component {
  render() {
    const colorOfSquare = this.props.color;
    return (
      <td
        style={{
          height: "15px",
          backgroundColor: "#fffff",
          color: "red",
          boarderColor: "pink",
          border: ".30px solid pink"
        }}
        onClick={this.props.handleClick}
      >
        <div
          style={{
            color: "red",
            border: "1px solid",
            backgroundColor: colorOfSquare,
            borderRadius: "50%",
            borderColor: colorOfSquare,
            height: 18,
            width: 19
          }}
        />
      </td>
    );
  }
}
export default Square;
