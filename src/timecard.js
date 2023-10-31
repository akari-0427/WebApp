import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import {Kensaku, TimeRecord}from'./components/timerecord'

function TimeCard(){
    return(
        <div>
            <Kensaku/>
        </div>
    );

}

export  default TimeCard;
