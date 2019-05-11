import React from "react";
import { Square } from "./Square";
import { Button } from "./Button";

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isItPink: true,
      //array of 19 because 19 across/down
      grid: Array(19)
        //fill grid with state on page
        //empty squares are the empty squares on page
        .fill()
        .map(x => Array(19).fill("emptySquare"))
    };
    //bind this word to handle the click and the reset button
    //passing as callback
    //bind creates new function which executes on click
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  //this generates a new empty grid when you reset and sets it to the grids state with setState = new empty grid on page.
  handleReset() {
    let newGrid = Array(19)
      .fill()
      .map(x => Array(19).fill("emptySquare"));
    this.setState({ grid: newGrid });
  }

  handleClick(x, y) {
    //only add a piece and check for wins if the clicked square is empty
    if (this.state.grid[x][y] === "emptySquare") {
      //we don't want to mutate state , so we store the reference to 'grid' in a const
      const g = this.state.grid;
      //set the grid square pink/green to the clicked square to the color of the current player
      //grid of clicked green or pink square = state of pink true if not green
      g[x][y] = this.state.isItPink === true ? "pink" : "green";
      //set the state with the new grid data
      this.setState({ grid: g, isItPink: !this.state.isItPink });

      //function for checking direction of colours
      function checkDirection(x_, y_, colour) {
        //track how many squares of a pink/green color there are in directions (specified by x_ and y_)
        //for example checkDir(0,1, 'p') checks how many pink dots there are in a row to the right )
        let tracked = 0;
        let _x = x;
        let _y = y;
        //stop tracking dots when the color is not equal to the specified dot or we have gone past the edge of the board
        //g is grid, x is pink- not eqal to undefined and dots of green and pink === colour
        while (g[_x] !== undefined && g[_x][_y] === colour) {
          //increment the number of tracked dots
          tracked += 1;
          //increment/decrease to check the next square in the specified direction
          _y += y_;
          _x += x_;
        }
        return tracked;
      }
      //sum the directions (left+right, up+down, 2 diagonals)
      const pink_horizontal =
        checkDirection(0, 1, "pink") + checkDirection(0, -1, "pink") - 1;
      const green_horizontal =
        checkDirection(0, 1, "green") + checkDirection(0, -1, "green") - 1;

      const pink_vertical =
        checkDirection(1, 0, "pink") + checkDirection(-1, 0, "pink") - 1;
      const green_vertical =
        checkDirection(1, 0, "green") + checkDirection(-1, 0, "green") - 1;

      const pink_diag1 =
        checkDirection(1, 1, "pink") + checkDirection(-1, -1, "pink") - 1;
      const green_diag1 =
        checkDirection(1, 1, " green") + checkDirection(-1, -1, "green") - 1;

      const pink_diag2 =
        checkDirection(-1, 1, "pink") + checkDirection(1, -1, "pink") - 1;
      const green_diag2 =
        checkDirection(-1, 1, "green") + checkDirection(1, -1, "green") - 1;

      //check to see if there are any sums greater than or equal to 5 and alert the players of a win
      //setTimeout is called if matches 5 or more for winner to action something
      if (
        pink_horizontal >= 5 ||
        pink_vertical >= 5 ||
        pink_diag1 >= 5 ||
        pink_diag2 >= 5
      ) {
        setTimeout(() => {
          alert("flamingo wins please click on header to retrieve your prize");
        }, 1);
      }

      if (
        green_horizontal >= 5 ||
        green_vertical >= 5 ||
        green_diag1 >= 5 ||
        green_diag2 >= 5
      ) {
        setTimeout(() => {
          alert("flamango wins, please click on header to retrieve your prize");
        }, 1);
      }
    }
  }
  render() {
    //define styles
    const style = {
      textAlign: "center",
      margin: "auto",
      height: "auto",
      width: "auto",
      border: "6px solid grey",
      tableLayout: "fixed"
    };
    const g = this.state.grid;
    //loop through the squares in each row and generate a new Square / component,
    //tr = rows
    //square colour defined in colour_,
    //return handle clicks with grid index and colours passed in as arguments
    //managing what happens with colour on click
    const board = g.map((row, i) => {
      return (
        <tr key={"row_" + i}>
          {row.map((col, j) => {
            //set the color of the square based on grids state
            const colour_ =
              g[i][j] === "emptySquare"
                ? "#e4e4a1"
                : g[i][j] === "pink"
                ? "pink"
                : "green";
            //return Square component, passing in the following as props:
            // colour is equal to the index and colour and index = empty make this colour/blank
            //or if equal to pink = pink/green etc
            //returns the board with the Square Components
            //as well as Button that takes the handleReset function as a prop
            //styling for returning board - title/ spaces inbetween cells, resetting, width of squares etc
            return (
              <Square
                handleClick={() => this.handleClick(i, j)}
                color={colour_}
                key={i + "_" + j}
              />
            );
          })}
        </tr>
      );
    });

    return (
      <div>
        <h1>
          <a href="https://pbs.twimg.com/media/DSGwOJTWkAcyV31.jpg">
            Flamingo-Flamango
          </a>
        </h1>
        <div style={{ height: "100%", width: "50vh" }}>
          <table cellSpacing="1" style={style}>
            <tbody>{board}</tbody>
          </table>
        </div>
        <br />
        <Button onClick={this.handleReset} />
      </div>
    );
  }
}
