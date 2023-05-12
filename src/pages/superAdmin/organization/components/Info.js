import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';

// components
import icon_arrow_left from '../../../../assets/images/icon_arrow_left.png';
import icon_graph from '../../../../assets/images/icon_graph.png';
import icon_circle_point from '../../../../assets/images/icon_circle_point.png';
import icon_circle_users from '../../../../assets/images/icon_circle_users.png';
import icon_circle_info from '../../../../assets/images/icon_circle_info.png';
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

        const { history, orgData, orgFdpList, orgUserList } = this.props;

        return (
            <div className="main-container">     
                <div className="sub-container">                    
                    
                    <div className="title-back"> 
                        <button className="btn" onClick={() => history.push('/dashboard')}>
                            <img src={icon_arrow_left} alt="icon" /> Back to Home
                        </button>
                    </div>
                    
                    <p className="title-main"> <img src={icon_graph} alt="icon" /> {orgData.Organization} </p>


                    <div className="info-item">
                        <img src={icon_circle_info} alt="icon" />
                        <p className="title-in"> Organization status </p>
                        <p className={`data-txt ${orgData.Status === 'Active' ? 'active' : 'inactive'}`}> {orgData.Status} </p> 
                    </div>

                    <div className="info-item">
                        <img src={icon_circle_bill} alt="icon" />
                        <p className="title-in"> Account type </p>
                        <p className="data-txt"> {orgData.AccountType} </p>
                    </div>

                    <div className="info-item">
                        <img src={icon_circle_point} alt="icon" />
                        <p className="title-in"> FAIR Data Points </p>
                        <p className="data-num"> {orgFdpList.list === undefined ? 0 : orgFdpList.list.length} </p>
                    </div>

                    <div className="info-item last">
                        <img src={icon_circle_users} alt="icon" />
                        <p className="title-in"> Users </p>
                        <p className="data-num"> {orgUserList.list === undefined ? 0 : orgUserList.list.length} </p>                        
                    </div>

                </div>
            </div>            
        );            
    }
}


const mapStateToProps = ({ organization, fdp, user }) => {

    const {
        orgData,
    } = organization;

    const {
        orgFdpList,
    } = fdp;
    
    const {
        orgUserList,
    } = user;

    return {
        orgData,
        orgFdpList,
        orgUserList,
    }
};


Info = connect(mapStateToProps, null)(Info)
export default Info;
