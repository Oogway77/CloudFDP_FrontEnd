import React, {Component} from 'react';

// other function
import * as funcs from '../../../../common/functions';

class General extends Component {   

    render() { 

        const { userData } = this.props;

        return (
            <div className="main-container">    
                <div className="divider"> </div> 
                <div className="sub-container">
                    
                    <p className="title-main"> General Information </p>

                    <div className="GI-container">
                        <div className="GI-item">
                            <p className="title-in"> Name </p>
                            <p className="data-txt"> {userData.firstname} {userData.lastname} </p>
                        </div>
                        <div className="GI-item">
                            <p className="title-in"> Email address </p>
                            <p className="data-num"> {userData.email} </p>                            
                        </div>
                        <div className="GI-item">
                            <p className="title-in"> User role </p>
                            <p className="data-num"> {userData.role} </p>                            
                        </div>
                        <div className="GI-item">
                            <p className="title-in"> Created on </p>
                            <p className="data-num"> {funcs.getLocalDate(userData.createdAt)} </p>                            
                        </div>
                    </div>

                </div>
            </div>
        );            
    }
}

export default General;
