import React, {Component} from 'react';

// other function
import * as funcs from '../../../../common/functions';

// components
import icon_arrow_left from '../../../../assets/images/icon_arrow_left.png';
import icon_circle_info from '../../../../assets/images/icon_circle_info.png';
import icon_circle_point from '../../../../assets/images/icon_circle_point.png';


class Info extends Component {   

    render() { 

        const { history, userData } = this.props;

        return (
            <div className="main-container">     
                <div className="sub-container">
                    
                    <div className="title-back"> 
                        <button className="btn" onClick={() => history.push('/dashboard')}>
                            <img src={icon_arrow_left} alt="icon" /> Back to Home
                        </button>
                    </div>

                    <p className="title-main"> {userData.firstname} {userData.lastname}  </p>

                    <div className="info-item">
                        <img src={icon_circle_info} alt="icon" />
                        <p className="title-in"> User status </p>
                        <p className={`data-txt ${userData.status === 'Active' ? 'active' : 'inactive'}`}> {userData.status} </p>
                        
                    </div>

                    <div className="info-item">
                        <img src={icon_circle_point} alt="icon" />
                        <p className="title-in"> User role </p>
                        <p className="data-txt"> {userData.role} </p>
                    </div>

                    <div className="info-item">
                        <p className="title-in"> Last login on </p>
                        <p className="data-num"> {funcs.getLocalDate(userData.lastLogin)} </p>
                        
                    </div>

                </div>
            </div>            
        );            
    }
}
export default Info;
