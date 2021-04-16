import React from 'react';
import Card from '@material-ui/core/Card';
import './FlightTimeline.css';

const divArray = (flightTimelineRange, div) => {
    let content = [];
    //144 is the amount of ten minute blocks in a day.
    for (let i = 0; i < 144; i++) {
      content.push(div)
    }
    return content;
  };

const element = <div className="timeline-bar-gray"></div>

//unable to finish component in time.
const FlightTimeline = ({...props}) => (
    <Card className="makeStyles-rootCard-12">
        <div className="legend">
            <div className="legend-labels">
                <span>3AM</span>
                <span>6AM</span>
                <span>9AM</span>
                <span>12PM</span>
                <span>3PM</span>
                <span>6PM</span>
                <span>9PM</span>
            </div>
            <div className="timeline">
                {divArray([props.departure, props.arrival],element)}
            </div>
        </div>
    </Card>
)

export default FlightTimeline;