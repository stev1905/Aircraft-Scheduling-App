import React, { Component } from 'react';
import AirCraftCardList from '../Components/CardList/AircraftCardList/AirCraftCardList';
import RotationCardList from '../Components/CardList/RotationCardList/RotationCardList';
import FlightsCardList from '../Components/CardList/FlightCardList/FlightsCardList';
import FlightTimeline from '../Components/CardList/FlightTimeline/FlightTimeline';
import Header from '../Components/Header/Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usage: 0,
      runningFlightTime: 0,
      isLoaded: false,
      pageNumber: 0,
      flightData: [],
      initialFlightData: [],
      aircraftData: [],
      rotationData:[],
    }
  }
  componentDidMount() {
    const flightUrl = `https://infinite-dawn-93085.herokuapp.com/flights?limit=25&offset=250`;
    const aircraftUrl = 'https://infinite-dawn-93085.herokuapp.com/aircrafts';
    Promise.all([fetch(flightUrl).then(res => res.json()), fetch(aircraftUrl).then(res => res.json())])
        .then(([flightData, aircraftData]) => {
          this.setState({aircraftData: aircraftData, flightData:flightData, initialFlightData: flightData.data, isLoaded: true });
    })
  }
  //Handles select page for pagination
  onChangePage = ({ selected }) => {
    this.setState({ pageNumber: selected });
  }
  
  getFilteredData = (destination, arrivaltime) => {
    const newFlightData = {};
    //selected destinationw ill compare against static list
    const newResults = this.state.initialFlightData.filter((flight) => {
      return flight.origin === destination && arrivaltime < flight.departuretime;
    });
    newFlightData['data'] = newResults;
    this.setState({ flightData: newFlightData });
  }
  
  //Reset State for app, clear out scheduler
  handleReset = (e) => {
    e.preventDefault();
    const flightUrl = `https://infinite-dawn-93085.herokuapp.com/flights?limit=25&offset=250`;
    const aircraftUrl = 'https://infinite-dawn-93085.herokuapp.com/aircrafts';
    Promise.all([fetch(flightUrl).then(res => res.json()), fetch(aircraftUrl).then(res => res.json())])
    .then(([flightData, aircraftData]) => {
      this.setState({
        aircraftData: aircraftData, 
        flightData: flightData, 
        initialFlightData: flightData.data,
        rotationData:[], 
        isLoaded: true,
        usage: 0,
        pageNumber: 0,
        runningFlightTime: 0, 
      });
    })
  }
  //calculate percentage of aircraft usage
  getAircraftUsage = (departure, arrival) => {
    const flightTime = (arrival - departure) / 60;
    const newRunningFlightTime = this.state.runningFlightTime + flightTime;
    this.setState({runningFlightTime: newRunningFlightTime});
    const percentage = ((newRunningFlightTime / 1440) * 100).toFixed(2);
    this.setState({usage: percentage})
  }
  //Handle moving flightcard to rotation
  onFlightSelect = (e) => {
    e.preventDefault();
    let flightcardId =  e.target.id;
    const newData =this.state.flightData.data.filter((newData) => {
      return flightcardId === newData.id
    })
    let rotation = {
      id: newData[0].id,
      origin: newData[0].origin,
      destination: newData[0].destination,
      readableDeparture: newData[0].readable_departure,
      readableArrival: newData[0].readable_arrival,
      arrival: newData[0].arrivaltime,
      departure: newData[0].departuretime,
    }
    const newRotation = this.state.rotationData;
    const flightTime = rotation.arrival - rotation.departure;
    const realFlightTime = flightTime + rotation.departure;
    if(realFlightTime > 86400) {
        alert('Flights Must be grounded at Midnight')
        return;
      } else {
      newRotation.push(rotation)
      const departureInSec = newData[0].departuretime;
      const arrivalInSec = newData[0].arrivaltime;
      const destination = rotation.destination;
      const arrivaltime = rotation.arrival;
      this.getAircraftUsage(departureInSec, arrivalInSec); 
      this.getFilteredData(destination, arrivaltime)
      this.setState({rotationData: newRotation});
    }
  }

  render() {
    const {aircraftData, flightData, rotationData, isLoaded, pageNumber} = this.state;
    return !isLoaded ? <h1>Loading..</h1> :
      (<div className="app">
        <Header />
        <div className="flightCard-Container">
          <AirCraftCardList 
            aircrafts={aircraftData} 
            usage={this.state.usage}
          />
          <div className="rotation-section">
            <RotationCardList 
              aircrafts={aircraftData} 
              rotationData={rotationData}
              handleReset={this.handleReset}
            />
          <FlightTimeline />
          </div>
            <FlightsCardList 
              flightData={flightData}
              pageNumber={pageNumber}
              onChangePage={this.onChangePage} 
              onFlightSelect={this.onFlightSelect}
            />
        </div>          
    </div>
    )
  }
}

export default App;
