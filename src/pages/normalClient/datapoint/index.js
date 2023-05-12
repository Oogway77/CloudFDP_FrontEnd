import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getFDPData, updateFDPStatus, deleteFDP, getFDPDtStatus, eraserFDPDtStatus } from '../../../redux/actions';

// components
import swal from 'sweetalert';
import queryString from 'query-string';
import Header2 from '../../../components/Header2';
import Menu from './components/Menu';
import Info from './components/Info';
import General from './components/General';
import Recent from './components/Recent';

class Datapoint extends Component {   
    constructor(props){
        super(props)
        this.state = {
            firstCall: false,
        }

        this.setTime = null;
        
    } 
   
    componentDidMount = async() => {    
        const { search } = this.props.location;        
        if(search !== ""){
            let params = queryString.parse(search);

            if (params.request1 !== undefined) {
                
                this.getFDPData(params.request1);

                return ;
            }
        }
        
        swal('It is the wrong access.').then((result)=>{
            this.props.history.push("/dashboard");
            return;
        })        
    }

    componentWillUnmount = () => {
        clearTimeout(this.setTime);
        this.setTime = null;
    }

    callVoid = () => {

    }

    getFDPData = (id) => {
        
        let data = JSON.stringify({
            "Id": id,
        });

        this.props.getFDPData(data, () => { if (!this.state.firstCall) this.getFDPDtStatus(); });
    }

    getFDPDtStatus = () => {
        this.setState({firstCall: true});
        let data = JSON.stringify({
            "CGNameBE": this.props.fdpData.BeCiName,
	        "CGNameFE": this.props.fdpData.FeCiName
        });

        this.props.getFDPDtStatus(data, this.cbStatus);
    }

    cbStatus = () => {
        const { fdpDtStatus } = this.props;
        if (fdpDtStatus.status === undefined || (fdpDtStatus.status !== 'Running...' && fdpDtStatus.status !== 'Terminated')) {
            // console.log('cirlce');
            this.setTime = setTimeout(this.getFDPDtStatus, 30000);
        }
        else
            this.getFDPData(this.props.fdpData._id);
    }

    updateFDPStatus = () => {

        swal({
            title: "Are you sure?",
            buttons: true
        })
        .then(confirm => {
            if (confirm) {
                let data = JSON.stringify({
                    "Id": this.props.fdpData._id,
                    "Status": this.props.fdpData.Status === 'Active' ? 'Inactive' : 'Active'
                });
        
                this.props.updateFDPStatus(data, () => {this.getFDPData(this.props.fdpData._id); this.getFDPDtStatus();});
            }
        });
        
    }

    deleteFDP = () => {
        
        swal({
            title: "Are you sure?",
            buttons: true
        })
        .then(confirm => {
            if (confirm) {
        
                let data = JSON.stringify({
                    "Id": this.props.fdpData._id,
                });
        
                this.props.deleteFDP(data, () => { this.props.eraserFDPDtStatus(); this.props.history.push("/dashboard");});
            }
        });

    }

    render() { 

        const { fdpDtStatus } = this.props;

        return (            
            <div className="dashboard">
                <Header2 {...this.props}/>
                {
                    (fdpDtStatus.status !== undefined && (fdpDtStatus.status === 'Running...' || fdpDtStatus.status === 'Terminated')) &&
                    <Menu {...this.props} updateFDPStatus={this.updateFDPStatus} deleteFDP={this.deleteFDP}/>
                }
                <Info {...this.props}/>
                <General {...this.props}/> 
                <Recent {...this.props}/>  
            </div>
            
        );            
    }
}


const mapStateToProps = ({ fdp }) => {

    const {
        fdpData,
        fdpRecentList,
        fdpDtStatus,
    } = fdp;

    return {
        fdpRecentList,
        fdpData,
        fdpDtStatus
    }
};

const mapDispatchToProps = { 
    getFDPData, updateFDPStatus, deleteFDP, getFDPDtStatus, eraserFDPDtStatus
 };

Datapoint = connect(mapStateToProps, mapDispatchToProps)(Datapoint)
export default Datapoint;
