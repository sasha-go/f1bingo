import React from 'react';
import './App.css';
import { Button, Card, Grid, CardContent,TextField} from '@mui/material';
import bingoItems from './bingoItems.json';
import styled from 'styled-components';
import BingoHeader from './components/bingoHeader';

const BingoBox = styled(Card)({
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  background: 'linear-gradient(45deg, red, 50%, gray 90%)',
  color: 'white',
  width: "275px",
  height: "225px",
  opacity: 1,
})

const CheckedBingoBox = styled(Card)({
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  background: 'linear-gradient(45deg, blue, 50%, gray 90%)',
  color: 'white',
  width: "275px",
  height: "225px",
  opacity: 1,
})

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      "name0": null,
      "name1": null,
      "name2": null,
      "name3": null,
      "name4": null,
      "name5": null,
      "name6": null,
      "name7": null,
      "name8": null,
      "name9": null,
      "name10": null,
      "name11": null
    };
  }

  markComplete = e => {
    const id = e.target.id;
    this.setState({[id]: true})
  }

  markInComplete = e => {
    const id = e.target.id;
    this.setState({[id]: false})
  }

  saveCard = e => {
    const buttonId = e.currentTarget.id.slice(-1);
    const nameId = "name" + buttonId;
    const emailId = "email" + buttonId;
    const nameInput = document.getElementById(nameId).value;
    const emailInput = document.getElementById(emailId).value;
    this.setState({[nameId]: nameInput, [emailId]: emailInput})
  }

  bingoRow(row) {
    let rowOne = bingoItems.slice(0, 3);
    let rowTwo = bingoItems.slice(3, 6);
    let rowThree = bingoItems.slice(6, 9);
    let renderRow;
    switch (row) {
      case 1:
        renderRow = rowOne;
        break;
      case 2:
        renderRow = rowTwo;
        break;
      case 3:
        renderRow = rowThree;
        break;
      default:
        renderRow = rowOne;
      }
    return ( 
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
      </Grid>
        ))}
        {renderRow.map(item => {
          const id = item.id;
          const nameId = "name" + id;
          const emailId = "email" + id;
          let results;
          let buttonText;

          if (((this.state[nameId] === null || this.state[emailId] === null))) {
            buttonText = "Save";
            results = 
              <>
                <body variant='body1'>{this.state[nameId]}</body>
                <body variant="body1">{this.state[emailId]}</body>
              </>
          
            return (
              <Grid item xs={3} key={item.id}>
                <BingoBox id={id}>
                  <CardContent>
                  <TextField color="warning" variant="standard" id={"name" + id} label="Enter Category"></TextField>
                  <TextField color="warning" variant="standard" id={"email" + id} label="Enter Driver"></TextField>
                  {results}
                  <Button color="inherit" variant="text" id={"button" + item.id} onClick={this.saveCard}>{buttonText}</Button>
                  </CardContent>
                </BingoBox>
                </Grid>
            )
          } else {
            results = 
              <>
                <body>{this.state[nameId]}</body>
                <body>{this.state[emailId]}</body>
              </>

            if (this.state[id] === false) {
              return (
                <Grid item xs={3} key={item.id}>
                  <BingoBox id={id} onClick={(this.markComplete)}>
                    <CardContent>
                    {results}
                    </CardContent>
                  </BingoBox>
                </Grid>
              )
            } else {
              return (
                <Grid item xs={3} key={item.id}>
                  <CheckedBingoBox id={id} onClick={this.markInComplete}>
                    <CardContent>
                    {results}
                    </CardContent>
                  </CheckedBingoBox>
                </Grid>
              )
            }
            
          }
        })
      }
      </Grid>
    )
  }

  render() {
  return (
    <>
      <BingoHeader />
      {this.bingoRow(1)}
      {this.bingoRow(2)}
      {this.bingoRow(3)}
    </>
  )};
}

export default App;
