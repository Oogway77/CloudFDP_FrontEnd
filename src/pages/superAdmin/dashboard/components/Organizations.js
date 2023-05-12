import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getOrgInfoList, updateOrgStatus } from '../../../../redux/actions';

// components
import swal from 'sweetalert';

// images
import icon_office from '../../../../assets/images/icon_office.png';
import icon_check from '../../../../assets/images/icon_check.png';
import icon_hourglass from '../../../../assets/images/icon_hourglass.png';
import icon_close from '../../../../assets/images/icon_close.png';
import icon_menu_more from '../../../../assets/images/icon_menu_more.png';
import icon_menu_less from '../../../../assets/images/icon_menu_less.png';


class Organizations extends Component {   
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    } 

    componentDidMount = () => {
        document.addEventListener('mouseup', this.mouseUp);
        this.props.getOrgInfoList('', this.callVoid);
    }

    componentWillUnmount = () => {
        document.removeEventListener('mouseup', this.mouseUp);
    }

    callVoid = () => {

    }

    mouseUp = (e) => {

        const { orgInfoList } = this.props;

        if (this.state[e.target.id] === true) {
            return ;
        }

        for (let i = 0; i < orgInfoList.list.length; i++) 
            this.setState({['data_'+orgInfoList.list[i].Id]: false});

    }

    updateOrgStatus = (id, status) => {
        swal({
            title: "Are you sure?",
            buttons: true
        })
        .then(confirm => {
            if (confirm) {

                let data = JSON.stringify({
                    "OrganizationId": id,
                    "Status": status === 'Active' ? 'Inactive' : 'Active'
                });
        
                this.props.updateOrgStatus(data, () => this.props.getOrgInfoList('', this.callVoid));
            }
        });
        
    }

    render() { 

        const { history, orgInfoList } = this.props;

        return (
            <div className="main-container">    
                <div className="divider"> </div> 
                <div className="sub-container">
                    
                    <p className="title-main"> <img src={icon_office} alt="icon" /> Organizations </p>

                    <div className="table-rect">
                        <table className="tb-normal">
                            <colgroup>
                                <col width="300" />
                                <col width="170" />
                                <col width="170" />
                                <col width="200" />
                                <col width="200" />
                                <col width="50px" />
                            </colgroup>
                            <tbody>
                                <tr >
                                    <th >Organization name</th>
                                    <th >FAIR Data Points</th>
                                    <th >Users</th>
                                    <th >Account type</th>
                                    <th >Status</th>
                                    <th ></th>
                                </tr>
                            {
                                orgInfoList.list !== undefined && orgInfoList.list
                                .map(item => {
                                    return (
                                        <tr key={'fdp_' + item.Id} >
                                            <td className="pointer" onClick={() => history.push(`/organization/?request1=${item.Id}`)}> {item.OrganizationName} </td>
                                            <td className="pointer" onClick={() => history.push(`/organization/?request1=${item.Id}`)}> {item.FAIRDataPoints}</td>
                                            <td className="pointer" onClick={() => history.push(`/organization/?request1=${item.Id}`)}> {item.Users} </td>
                                            <td className="pointer" onClick={() => history.push(`/organization/?request1=${item.Id}`)}> {item.AccountType} </td>
                                            <td className="pointer" onClick={() => history.push(`/organization/?request1=${item.Id}`)}> 
                                                {
                                                    item.Status === 'Active' && <img className="icon" src={icon_check} alt="icon" /> 
                                                }
                                                {
                                                    item.Status === 'Invited' && <img className="icon" src={icon_hourglass} alt="icon" /> 
                                                }
                                                {
                                                    item.Status === 'Inactive' && <img className="icon"  src={icon_close} alt="icon" /> 
                                                }
                                                
                                                {item.Status} 
                                            </td>
                                            <td > 
                                                <div className="more-menu">
                                                    <div className="oneDepth">
                                                        {
                                                            this.state['data_'+item.Id] === undefined || !this.state['data_'+item.Id] ?
                                                                <img id={'data_'+item.Id} className="btn" src={icon_menu_more} alt="icon" onClick={() => this.setState({['data_'+item.Id]: true})}/> 
                                                            :
                                                                <img id={'data_'+item.Id} className="btn" src={icon_menu_less} alt="icon" onClick={() => this.setState({['data_'+item.Id]: false})}/> 
                                                        }
                                                    </div>
                                                    <div className={`panel none ${this.state['data_'+item.Id] === undefined || !this.state['data_'+item.Id] ? 'hide':'show'}`}>
                                                        <button onClick={() => history.push(`/organization/?request1=${item.Id}`)}>View details</button>
                                                        <button onClick={() => this.updateOrgStatus(item.Id, item.Status)}>
                                                            {
                                                                item.Status === 'Active' ? 'Deactivate' : 'Activate'
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


const mapStateToProps = ({ organization }) => {

    const {
        orgInfoList,
    } = organization;

    return {
        orgInfoList
    }
};

const mapDispatchToProps = { 
    getOrgInfoList, updateOrgStatus
};


Organizations = connect(mapStateToProps, mapDispatchToProps)(Organizations)
export default Organizations;
