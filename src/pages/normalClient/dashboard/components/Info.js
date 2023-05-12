import React, {Component} from 'react';

// components
import icon_graph from '../../../../assets/images/icon_graph.png';
import icon_circle_point from '../../../../assets/images/icon_circle_point.png';
import icon_circle_users from '../../../../assets/images/icon_circle_users.png';
import icon_circle_bill from '../../../../assets/images/icon_circle_bill.png';


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

        const { userDashInfo } = this.props;

        return (
            <div className="main-container">     
                <div className="sub-container">
                    
                    <p className="title-main"> <img src={icon_graph} alt="icon" /> {userDashInfo.Organization}</p>

                    <div className="info-item">
                        <img src={icon_circle_bill} alt="icon" />
                        <p className="title-in"> Account type </p>
                        <p className="data-txt"> {userDashInfo.AccountType} </p>
                    </div>

                    <div className="info-item">
                        <img src={icon_circle_point} alt="icon" />
                        <p className="title-in"> FAIR Data Points </p>
                        <p className="data-num"> {userDashInfo.FAIRDataPoints === undefined ? 0 : userDashInfo.FAIRDataPoints.length} </p>
                    </div>

                    <div className="info-item last">
                        <img src={icon_circle_users} alt="icon" />
                        <p className="title-in"> Users </p>
                        <p className="data-num"> {userDashInfo.Users === undefined ? 0 : userDashInfo.Users.length} </p> 
                    </div>

                </div>
            </div>            
        );            
    }
}

export default Info;
