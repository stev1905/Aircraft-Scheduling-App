import React from 'react';
import Card from '@material-ui/core/Card';
import Scroll from '../../Scroll/Scroll';
import Airplane from '../../../Airplane/Airplane';
import './RotationCardList.css';

const RotationCardList = ({ ...props }) => {
    const aircraftName =props.aircrafts.data[0].ident;
    const rotationData = props.rotationData;
    return !rotationData.length 
          ? (<div className="rotation-container">
          <h1><span>Rotation {aircraftName}</span></h1>
          <Card className="makeStyles-rootCard-1">
              <Airplane />
          </Card>   
        </div>   
      ): 
      (<div className="rotation-container">
        <h1><span>Rotation {aircraftName}</span></h1>
        <Card className="makeStyles-rootCard-1">
        <div className="card-container">
          <Scroll>
            {rotationData.map(rotation => ( 
              <Card key={rotation.id} className="makeStyles-rootCard-2">
                    <div className="rotationName">Flights: {rotation.id}</div>
                    <div className="rotationData">
                      <div className="depart-rotation">
                        <span>{rotation.origin}</span>
                        <span>{rotation.readableDeparture}</span>
                      </div>
                      <div className="arrow-rotation">
                      <i class="fa fa-long-arrow-right fa-5x"></i>
                      </div>
                      <div className="arrival-rotation">
                        <span>{rotation.destination}</span>
                        <span>{rotation.readableArrival}</span>
                      </div>
                    </div>
                </Card>
              ))}
            </Scroll> 
          </div>
          <hr />
          <div className="button-container">
            <button className="button" onClick={props.handleReset}>Reset Schedule</button>
          </div>    
        </Card>   
      </div>   
    )
}

export default RotationCardList;