import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getUserDashInfo, updateFDPStatus } from '../../../../redux/actions';

// other function
import * as funcs from '../../../../common/functions';

// components
import swal from 'sweetalert';

// images
import icon_point from '../../../../assets/images/icon_point.png';
import icon_check from '../../../../assets/images/icon_check.png';
import icon_hourglass from '../../../../assets/images/icon_hourglass.png';
import icon_close from '../../../../assets/images/icon_close.png';
import icon_menu_more from '../../../../assets/images/icon_menu_more.png';
import icon_menu_less from '../../../../assets/images/icon_menu_less.png';


class FDpoint extends Component {   
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    } 

    componentDidMount = () => {
        document.addEventListener('mouseup', this.mouseUp);
    }

    componentWillUnmount = () => {
        document.removeEventListener('mouseup', this.mouseUp);
    }

    callVoid = () => {

    }

    mouseUp = (e) => {

        const { userDashInfo } = this.props;

        if (this.state[e.target.id] === true || userDashInfo.FAIRDataPoints === undefined) {
            return ;
        }

        for (let i = 0; i < userDashInfo.FAIRDataPoints.length; i++) 
            this.setState({['data_'+userDashInfo.FAIRDataPoints[i]._id]: false});

    }

    updateFDPStatus = (id, status) => {
        
        swal({
            title: "Are you sure?",
            buttons: true
        })
        .then(confirm => {
            if (confirm) {

                let data = JSON.stringify({
                    "Id": id,
                    "Status": status === 'Active' ? 'Inactive' : 'Active'
                });
        
                this.props.updateFDPStatus(data, () => this.props.getUserDashInfo('', this.callVoid));
            }
        });
    }

    render() { 

        const { history, userDashInfo } = this.props;

        return (
            <div className="main-container">    
                <div className="divider"> </div> 
                <div className="sub-container">
                    
                    <p className="title-main"> <img src={icon_point} alt="icon" /> FAIR Data Points </p>

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
                                    <th >FDP name</th>
                                    <th >FDP type</th>
                                    <th >Region</th>
                                    <th >Status</th>
                                    <th >Created on</th>
                                    <th ></th>
                                </tr>
                            {
                                userDashInfo.FAIRDataPoints !== undefined && userDashInfo.FAIRDataPoints
                                .map(item => {
                                    return (
                                        <tr key={'fdp_' + item._id} >
                                            <td className="pointer" onClick={() => history.push(`/datapoint/?request1=${item._id}`)}> {item.DataPointName} </td>
                                            <td className="pointer" onClick={() => history.push(`/datapoint/?request1=${item._id}`)}> {item.TypeOfDataPoint}</td>
                                            <td className="pointer" onClick={() => history.push(`/datapoint/?request1=${item._id}`)}> {item.Region} </td>
                                            <td className="pointer" onClick={() => history.push(`/datapoint/?request1=${item._id}`)}> 
                                                {
                                                    item.Status === 'Active' && <img className="icon" src={icon_check} alt="icon" /> 
                                                }
                                                {
                                                    item.Status === 'Deploying' && <img className="icon" src={icon_hourglass} alt="icon" /> 
                                                }
                                                {
                                                    item.Status === 'Inactive' && <img className="icon"  src={icon_close} alt="icon" /> 
                                                }
                                                
                                                {item.Status} 
                                            </td>
                                            <td className="pointer" onClick={() => history.push(`/datapoint/?request1=${item._id}`)}> {funcs.getLocalDate(item.createdAt)} </td>
                                            <td > 
                                                <div className="more-menu">
                                                    <div className="oneDepth">
                                                        {
                                                            this.state['data_'+item._id] === undefined || !this.state['data_'+item._id] ?
                                                                <img id={'data_'+item._id} className="btn" src={icon_menu_more} alt="icon" onClick={() => this.setState({['data_'+item._id]: true})}/> 
                                                            :
                                                                <img id={'data_'+item._id} className="btn" src={icon_menu_less} alt="icon" onClick={() => this.setState({['data_'+item._id]: false})}/> 
                                                        }
                                                    </div>
                                                    <div className={`panel none ${this.state['data_'+item._id] === undefined || !this.state['data_'+item._id] ? 'hide':'show'}`}>
                                                        <button onClick={() => history.push(`/datapoint/?request1=${item._id}`)}>View details</button>
                                                        <button onClick={() => this.updateFDPStatus(item._id, item.Status)}>
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

const mapStateToProps = ({ user }) => {

    const {
        userDashInfo,
    } = user;

    return {
        userDashInfo
    }
};

const mapDispatchToProps = { 
    getUserDashInfo, updateFDPStatus
};


FDpoint = connect(mapStateToProps, mapDispatchToProps)(FDpoint)
export default FDpoint;
