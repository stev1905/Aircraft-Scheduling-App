import React from 'react';
import Card from '@material-ui/core/Card';
import './AirCraftCardList.css';

const AirCraftCardList = ({ ...props }) => {
    return (
      <div className="aircraft-container">
        <h1><span>Aircrafts</span></h1> 
       <Card className="makeStyles-rootCard-5">
            {props.aircrafts.data.map(aircraft => (
              <Card key={aircraft.ident} className="makeStyles-rootCard-6">
                <div className="aircraftdata">
                  <span className="aircraft">{aircraft.ident}</span>
                  <span className="usage">{props.usage} %</span>
                </div>
              </Card>
            ))}     
        </Card> 
      </div>      
    )
}

export default AirCraftCardList;