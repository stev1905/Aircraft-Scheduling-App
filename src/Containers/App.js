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
      flightTimelineRange: [],
      selectedFlights: {},
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
  
  //Returns filtered list based on user selection
  //tried to account for flights before or after selected flight.
  //I wasn't sure how to not repeat flights. Curious as to how I can acheive this.
  getFilteredData = (origin, destination, departureTime, arrivalTime, id) => {
    const newFlightData = {};
    console.log(this.state.selectedFlights)
    console.log(origin, destination, departureTime, arrivalTime, id)
    const newResults = this.state.initialFlightData.filter((flight) => {
      console.log(flight.departuretime, flight.arrivaltime, flight.origin, (flight.destination === origin && departureTime > flight.arrivaltime) || (flight.origin === destination && arrivalTime < flight.departuretime) )
      return ((flight.destination === origin && departureTime > flight.arrivaltime) || (flight.origin === destination && arrivalTime < flight.departuretime) 
      )
    }).filter((selectedData) => !(selectedData.id in this.state.selectedFlights))
   
    newFlightData['data'] = newResults;
    this.setState({flightData: newFlightData});
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
        flightTimelineRange: [],
        selectedFlights: {},
        isLoaded: true,
        usage: 0,
        pageNumber: 0,
        flightTimelineRange: [],
        runningFlightTime: 0, 
      });
    })
  }

  //This method is incomplete. Could not figure out how to get colors to component. With more time, Ithink I could've figured it out.
  getTimelineRange = (departure, arrival) => {
    const convertedDeparture = Math.round((departure / 60) / 10);
    const convertedArrival = Math.round((arrival / 60) / 10);
    const newFlightTimeline = this.state.flightTimelineRange;
    
    newFlightTimeline.push([convertedDeparture, convertedArrival])
    this.setState({flightTimelineRange: newFlightTimeline})
  }
  //calculate percentage of aircraft usage
  getAircraftUsage = (departure, arrival) => {
    const flightTime = (arrival - departure) / 60;
    const newRunningFlightTime = this.state.runningFlightTime + flightTime;
    const percentage = ((newRunningFlightTime / 1440) * 100).toFixed(2);
    this.setState({runningFlightTime: newRunningFlightTime, usage: percentage});
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
      arrivalTime: newData[0].arrivaltime,
      departureTime: newData[0].departuretime,
    }
    const newRotation = this.state.rotationData;
    const newSelectedFlights = this.state.selectedFlights;
    const flightTime = rotation.arrivalTime - rotation.departureTime;
    const realFlightTime = flightTime + rotation.departureTime;
    if(realFlightTime > 86400) {
        alert('Flights Must be grounded at Midnight')
        return;
      } else {
      newRotation.push(rotation)
      newSelectedFlights[rotation.id] = true;
      newRotation.sort((a, b) => (a.departureTime > b.departureTime) ? 1 : -1)
      this.getAircraftUsage(rotation.departureTime, rotation.arrivalTime); 
      this.getFilteredData(rotation.origin, rotation.destination, rotation.departureTime, rotation.arrivalTime, rotation.id);
      this.getTimelineRange (rotation.departureTime, rotation.arrivalTime)
      this.setState({rotationData: newRotation, selectedFlights: newSelectedFlights});
    }
  }

  render() {
    const {aircraftData, flightData, rotationData,usage, isLoaded, pageNumber, flightTimelineRange} = this.state;
    const {onChangePage, onFlightSelect, handleReset} = this;
    return !isLoaded ? <h1>Loading..</h1> :
      (<div className="app">
        <Header />
        <div className="flightCard-Container">
          <AirCraftCardList 
            aircrafts={aircraftData} 
            usage={usage}
          />
          <div className="rotation-section">
            <RotationCardList 
              aircrafts={aircraftData} 
              rotationData={rotationData}
              handleReset={handleReset}
            />
          <FlightTimeline 
              flightTimelineRange={flightTimelineRange}
          />
          </div>
            <FlightsCardList 
              flightData={flightData}
              pageNumber={pageNumber}
              onChangePage={onChangePage} 
              onFlightSelect={onFlightSelect}
            />
        </div>          
    </div>
    )
  }
}

export default App;
