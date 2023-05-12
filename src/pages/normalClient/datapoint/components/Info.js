import React, {Component} from 'react';

// other function
import * as funcs from '../../../../common/functions';

// components
import icon_arrow_left from '../../../../assets/images/icon_arrow_left.png';
import icon_circle_info from '../../../../assets/images/icon_circle_info.png';
import icon_circle_point from '../../../../assets/images/icon_circle_point.png';


class Info extends Component {   
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    } 

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() { 

        const { history, eraserFDPDtStatus,  fdpData, fdpRecentList } = this.props;

        return (
            <div className="main-container">     
                <div className="sub-container">
                    
                    <div className="title-back"> 
                        <button className="btn" onClick={() => {eraserFDPDtStatus(); history.push('/dashboard')}}>
                            <img src={icon_arrow_left} alt="icon" /> Back to Home 
                        </button>
                    </div>

                    <p className="title-main"> {fdpData.DataPointName} </p>

                    <div className="info-item">
                        <img src={icon_circle_info} alt="icon" />
                        <p className="title-in"> FDP status </p>
                        <p className={`data-txt ${fdpData.Status === 'Active' ? 'active' : 'inactive'}`}> {fdpData.Status} </p>
                        
                    </div>

                    <div className="info-item">
                        <img src={icon_circle_point} alt="icon" />
                        <p className="title-in"> Activities </p>
                        <p className="data-num"> {fdpRecentList.totalRowCount === undefined ? 0 : fdpRecentList.totalRowCount} </p>
                    </div>

                    <div className="info-item">
                        <p className="title-in"> Last retrieved on </p>
                        <p className="data-num"> {funcs.getLocalDate(fdpData.updatedAt)} </p>
                        
                    </div>

                </div>
            </div>            
        );            
    }
}

export default Info;
