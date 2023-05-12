import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getUserDashInfo, updateUserStatus } from '../../../../redux/actions';

// other function
import * as funcs from '../../../../common/functions';

// images
import icon_users from '../../../../assets/images/icon_users.png';
import icon_check from '../../../../assets/images/icon_check.png';
import icon_hourglass from '../../../../assets/images/icon_hourglass.png';
import icon_close from '../../../../assets/images/icon_close.png';
import icon_menu_more from '../../../../assets/images/icon_menu_more.png';
import icon_menu_less from '../../../../assets/images/icon_menu_less.png';


class Users extends Component {   
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    }     

    componentDidMount = async() => {
        document.addEventListener('mouseup', this.mouseUp);
    }

    componentWillUnmount = () => {
        document.removeEventListener('mouseup', this.mouseUp);
    }

    mouseUp = (e) => {

        const { userDashInfo } = this.props;

        if (this.state[e.target.id] === true || userDashInfo.Users === undefined) {
            return ;
        }

        for (let i = 0; i < userDashInfo.Users.length; i++) 
            this.setState({['user_'+userDashInfo.Users[i]._id]: false});

    }

    updateUserStatus = (id, status) => {

        let data = JSON.stringify({
            "Id": id,
            "Status": status === 'Active' ? 'Inactive' : 'Active'
        });

        this.props.updateUserStatus(data, () => this.props.getUserDashInfo('', this.callVoid));
    }

    callVoid = () => {
        
    }

    render() { 

        const { history, userDashInfo } = this.props;

        return (
            <div className="main-container">    
                <div className="divider"> </div> 
                <div className="sub-container">
                    
                    <p className="title-main"> <img src={icon_users} alt="icon" /> Users </p>

                    <div className="table-rect">
                        <table className="tb-normal">
                            <colgroup>
                                <col width="220" />
                                <col width="250" />
                                <col width="200" />
                                <col width="200" />
                                <col width="220" />
                                <col width="50px" />
                            </colgroup>
                            <tbody>
                                <tr >
                                    <th >Name</th>
                                    <th >Email address</th>
                                    <th >User role</th>
                                    <th >Status</th>
                                    <th >Created on</th>
                                    <th ></th>
                                </tr>
                            {
                                userDashInfo.Users !== undefined && userDashInfo.Users
                                .map((item, key) => {
                                    return (
                                        <tr key={'user_' + item._id} >
                                            <td className="pointer" onClick={() => history.push(`/user/?request1=${item._id}`)}> {item.firstname} {item.lastname} </td>
                                            <td className="pointer" onClick={() => history.push(`/user/?request1=${item._id}`)}> {item.email}</td>
                                            <td className="pointer" onClick={() => history.push(`/user/?request1=${item._id}`)}> {item.role} </td>
                                            <td className="pointer" onClick={() => history.push(`/user/?request1=${item._id}`)}> 
                                                {
                                                    item.status === 'Active' && <img className="icon" src={icon_check} alt="icon" /> 
                                                }
                                                {
                                                    item.status === 'Invited' && <img className="icon" src={icon_hourglass} alt="icon" /> 
                                                }
                                                {
                                                    item.status === 'Inactive' && <img className="icon" src={icon_close} alt="icon" /> 
                                                }
                                                
                                                {item.status} 
                                            </td>
                                            <td className="pointer" onClick={() => history.push(`/user/?request1=${item._id}`)}> {funcs.getLocalDate(item.createdAt)} </td>
                                            <td > 
                                                <div className="more-menu">
                                                    <div className="oneDepth">
                                                        {
                                                            this.state['user_'+item._id] === undefined || !this.state['user_'+item._id] ?
                                                                <img id={'user_'+item._id} className="btn" src={icon_menu_more} alt="icon" onClick={() => this.setState({['user_'+item._id]: true})}/> 
                                                            :
                                                                <img id={'user_'+item._id} className="btn" src={icon_menu_less} alt="icon" onClick={() => this.setState({['user_'+item._id]: false})}/> 
                                                        }
                                                    </div>
                                                    <div className={`panel none ${this.state['user_'+item._id] === undefined || !this.state['user_'+item._id] ? 'hide':'show'}`}>
                                                        <button onClick={() => history.push(`/user/?request1=${item._id}`)}>View details</button>
                                                        <button onClick={() => this.updateUserStatus(item._id, item.status)}>
                                                            {
                                                                item.status === 'Active' ? 'Deactivate' : 'Activate'
                                                            }
                                                        </button>
                                                    </div>
                                                </div>       
                                            </td>
                                        </tr>  
                                    );
                                })
                            }
                            
                            </tbody>
                        </table> 
                    </div>

                </div>
            </div>
        );            
    }
}


const mapStateToProps = ({ user }) => {

    const {
        userDashInfo,
    } = user;

    return {
        userDashInfo
    }
};

const mapDispatchToProps = { 
    getUserDashInfo, updateUserStatus
};


Users = connect(mapStateToProps, mapDispatchToProps)(Users)
export default Users;
