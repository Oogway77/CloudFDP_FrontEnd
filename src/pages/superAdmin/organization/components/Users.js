import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getOrgUserList } from '../../../../redux/actions';

// components
import swal from 'sweetalert';
import queryString from 'query-string';

// other
import * as funcs from '../../../../common/functions';

// images
import icon_users from '../../../../assets/images/icon_users.png';
import icon_check from '../../../../assets/images/icon_check.png';
import icon_hourglass from '../../../../assets/images/icon_hourglass.png';
import icon_close from '../../../../assets/images/icon_close.png';


class Users extends Component {   
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    }     

    componentDidMount = async() => {

        const { search } = this.props.location;

        if(search !== ""){
            let params = queryString.parse(search);
            if (params.request1 !== undefined) {
                let selID = params.request1;    
                
                let data = JSON.stringify({   
                    "OrganizationId": selID,
                });          
                this.props.getOrgUserList( data, this.callback);
                return ;
            }
        }
        
        swal('It is the wrong access.').then((result)=>{
            this.props.history.push("/dashboard");
            // return;
        })
    }

    callback = (flag) => {
        if (flag === false)
            swal('It is the wrong access.');
    }

    render() { 

        const { orgUserList } = this.props;

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
                            </colgroup>
                            <tbody>
                                <tr >
                                    <th >Name</th>
                                    <th >Email address</th>
                                    <th >User role</th>
                                    <th >Status</th>
                                    <th >Created on</th>
                                </tr>
                            {
                                orgUserList.list !== undefined && orgUserList.list
                                .map((item, key) => {
                                    return (
                                        <tr key={'user_' + key} >
                                            <td className="pointer"> {item.Name} </td>
                                            <td > {item.EmailAddress}</td>
                                            <td > {item.UserRole} </td>
                                            <td > 
                                                {
                                                    item.Status === 'Active' && <img className="icon" src={icon_check} alt="icon" /> 
                                                }
                                                {
                                                    item.Status === 'Invited' && <img className="icon" src={icon_hourglass} alt="icon" /> 
                                                }
                                                {
                                                    item.Status === 'Inactive' && <img className="icon" src={icon_close} alt="icon" /> 
                                                }
                                                
                                                {item.Status} 
                                            </td>
                                            <td > {funcs.getLocalDate(item.CreatedOn)} </td>                                            
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
        orgUserList,
    } = user;
    return {
        orgUserList,
    }
};

const mapDispatchToProps = { 
    getOrgUserList
};


Users = connect(mapStateToProps, mapDispatchToProps)(Users)
export default Users;
