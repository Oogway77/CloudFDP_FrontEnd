import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getOrgFDPList } from '../../../../redux/actions';

// components
import swal from 'sweetalert';
import queryString from 'query-string';

// other function
import * as funcs from '../../../../common/functions';

// images
import icon_point from '../../../../assets/images/icon_point.png';
import icon_check from '../../../../assets/images/icon_check.png';
import icon_hourglass from '../../../../assets/images/icon_hourglass.png';
import icon_close from '../../../../assets/images/icon_close.png';


class FDpoint extends Component {   
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
                this.props.getOrgFDPList( data, this.callback);
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

        const { orgFdpList } = this.props;

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
                            </colgroup>
                            <tbody>
                                <tr >
                                    <th >FDP name</th>
                                    <th >FDP type</th>
                                    <th >Region</th>
                                    <th >Status</th>
                                    <th >Created on</th>
                                </tr>
                            {
                                orgFdpList.list !== undefined && orgFdpList.list
                                .map((item, key) => {
                                    return (
                                        <tr key={'fdp_' + key} >
                                            <td className="pointer"> {item.FDPName} </td>
                                            <td > {item.FDPType}</td>
                                            <td > {item.Region} </td>
                                            <td > 
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


const mapStateToProps = ({ fdp }) => {

    const {
        orgFdpList,
    } = fdp;

    return {
        orgFdpList
    }
};

const mapDispatchToProps = { 
    getOrgFDPList
};


FDpoint = connect(mapStateToProps, mapDispatchToProps)(FDpoint)
export default FDpoint;
