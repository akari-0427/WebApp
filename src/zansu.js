import { Line } from "react-chartjs-2";
import {NameSyutoku,GetZansu, Gurahu} from "./components/remain"
import { Link } from "react-router-dom";

function Zansu(){
    return(
        <div>
            <GetZansu/>
            
            <Link to="/" className="lin">ホームへ</Link>
        </div>
    );

}

export default Zansu;