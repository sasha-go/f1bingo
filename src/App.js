import React from 'react';
import './App.css';
import { Card, Grid, CardContent, MenuItem, TextField} from '@mui/material';
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
  height: "140px",
  opacity: 1,
})

const CheckedBingoBox = styled(Card)({
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  background: 'linear-gradient(45deg, blue, 50%, gray 90%)',
  color: 'white',
  height: "140px",
  opacity: 1,
})

const selectCategoryItems = [
  {
    id: 0,
    value: "Top 5",
  },
  {
    id: 1,
    value: "Midfield",
  },
  {
    id: 2,
    value: "Bottom 5",
  },
  {
    id: 3,
    value: "First",
  },
  {
    id: 4,
    value: "Second",
  },
  {
    id: 5,
    value: "Third",
  },
  {
    id: 6,
    value: "DNF",
  },
  {
    id: 7,
    value: "Beat Teammate",
  },
  {
    id: 8,
    value: "Shortest Pit",
  },
  {
    id: 9,
    value: "Category",
  },
];
const selectDriverItem = [
  {
    value: "Max Verstappen",
  },
  {
    value: "Sergio Perez",
  },
  {
    value: "Charles LeClerc",
  },
  {
    value: "Carlos Sainz",
  },
  {
    value: "George Russell",
  },
  {
    value: "Lewis Hamilton",
  },
  {
    value: "Pierre Gasly",
  },
  {
    value: "Oscar Piastri",
  },
  {
    value: "Lando Norris",
  },
  {
    value: "Valtteri Bottas",
  },
  {
    value: "Zhou Guanyu",
  },
  {
    value: "Lance Stroll",
  },
  {
    value: "Fernando Alonso",
  },
  {
    value: "Kevin Magnussen",
  },
  {
    value: "Nico Hulkenberg",
  },
  {
    value: "Nyck De Vries",
  },
  {
    value: "Yuki Tsunoda",
  },
  {
    value: "Alexander Albon",
  },
  {
    value: "Logan Sargeant",
  },
  {
    value: "Reserve Driver",
  },
  {
    value: "Driver",
  },
];
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
      "category0": "",
      "category1": "",
      "category2": "",
      "category3": "",
      "category4": "",
      "category5": "",
      "category6": "",
      "category7": "",
      "category8": "",
      "category9": "",
      "category10": "",
      "category11": "",
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
    e.preventDefault()
    const itemId = e.currentTarget.id.slice(-1);
    console.log("item:" + itemId);
    const categoryId = "category" + itemId;
    const driverId = "driver" + itemId;
    const categoryInput = this.state[categoryId];
    const driverInput = this.state[driverId];
    // const categoryInput = document.getElementById(driverId).value;
    // const driverInput = document.getElementById(driverId).value;
    console.log("category:" + categoryId);
    console.log("categoryValue:" + categoryInput);
    console.log("driver:" + driverId);
    console.log("driverValue:" + driverInput);


    this.setState({[categoryId]: categoryInput, [driverId]: driverInput})
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
      <Grid container direction="row" justifyContent="center"  alignItems="center" rowSpacing={2} columnSpacing={2} columns={{ xs: 12, sm: 12, md: 12 }} >
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index} zeroMinWidth></Grid>
        ))}
        {renderRow.map((item) => {
          const id = item.id;
          const categoryId = "category" + id;
          const driverId = "driver" + id;
          let results;

          // Start Game - no categories or drivers chosen
          if (((this.state[categoryId] === "" || this.state[driverId] === undefined))) {
            results = 
              <>
                <body variant="body1">{this.state[driverId]}</body>
                <body variant='body1'>{this.state[categoryId]}</body>
              </>
          
          // update categoryID when select item is selected
            return (
              <Grid item xs={3} key={item.id}>
                <BingoBox id={id}>
                  <CardContent>
                  <TextField 
                      color="warning"
                      variant="standard"
                      id={"driver" + id}
                      select 
                      defaultValue="Driver"              
                    >
                      {selectDriverItem.map((selectDriverItem) => (
                        <MenuItem 
                          key={selectDriverItem.value} 
                          value={selectDriverItem.value}
                          onClick={((e) => {
                            this.setState({
                              ["driver" + id]: selectDriverItem.value
                            })
                          })} 
                          >
                          {selectDriverItem.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField 
                      color="warning"
                      variant="standard"
                      select 
                      id={"category" + id}
                      // helperText={"Select Category"}
                      value={this.state["category" + id].value} 
                      defaultValue="Category"              
                    >
                      {selectCategoryItems.map((selectCategoryItems) => (
                        <MenuItem
                          key={selectCategoryItems.value} 
                          value={selectCategoryItems.value}
                          onClick={((e) => {
                            this.setState({
                              ["category" + id]: selectCategoryItems.value
                            })
                          })} 
                        >
                          {selectCategoryItems.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    {/* <TextField color="warning" variant="standard" id={"category" + id} label="Enter Category"></TextField> */}
                    {/* <TextField color="warning" variant="standard" id={"driver" + id} label="Enter Driver"></TextField> */}
                    {/* {results} */}
                    {/* <Button color="inherit" variant="text" id={"button" + item.id} onClick={this.saveCard}>Save</Button> */}
                  </CardContent>
                </BingoBox>
              </Grid>
            )
          } else {
            // Categories and drivers are selected
            results = 
              <>
                <body>{this.state[driverId]}</body>
                <body>{this.state[categoryId]}</body>
              </>

            // Categories and drivers are selected, but bingo box has not been marked yet
            // Player has choice to mark as complete, once this box is marked as complete
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

              // Categories and drivers are selected, but bingo box has not been marked yet
              // Player has choice to mark incomplete again, if checked off by accident
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
