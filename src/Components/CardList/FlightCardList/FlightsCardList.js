import React from 'react';
import Card from '@material-ui/core/Card';
import ReactPaginate from 'react-paginate';
import './FlightCardList.css'

const FlightsCardList = ({...props }) => {
  const flightData = props.flightData.data;
  const usersPerPage = 5;
  const pageNumber = props.pageNumber;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(flightData.length / usersPerPage)
  const displayFlightData = flightData.slice(pagesVisited, pagesVisited + usersPerPage).map((flight) => (
    <Card key={flight.id} className="makeStyles-rootCard-8"> 
   
      <i className="fa fa-plus-square fa-sm" onClick={props.onFlightSelect} id={flight['id']}></i>
      <div className="flightName-container">
        <div className="flightName">{flight.id}</div>
      </div>
      <div className="flightContent">
        <div className="depart">{flight.origin}</div>
        <div className="arrival">{flight.destination}</div>
      </div>
      <div className="flightContent">
        <div className="depart">{flight.readable_departure}</div>
        <div className="arrival">{flight.readable_arrival}</div>
      </div>
    </Card>
  ))
    return (
      <div className="flight-container">
      <h1><span>Flights</span></h1> 
        <Card className="makeStyles-rootCard-5">
          <div className="displayflight">
            {displayFlightData}
          </div> 
          <hr />       
          <ReactPaginate 
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={props.onChangePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />        
          </Card>
    </div>       
    )
}

export default FlightsCardList;