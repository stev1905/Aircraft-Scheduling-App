import React from 'react';
import airplane from '../Assets/airplane.png'
import './Airplane.css';

const Airplane = () => (
 <div className="airplane">
     <span className="airplanetitle">Aircraft Scheduler</span>
     <img src={airplane} alt="airplane"/>
     <span className="airplanefooter">Developed by: Christian Stevens</span>
 </div>
)

export default Airplane;