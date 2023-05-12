import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { insertFDP } from '../../../redux/actions';

// components
import swal from 'sweetalert';
import Header1 from '../../../components/Header1';

// images
import icon_radio_fill from '../../../assets/images/icon_radio_fill.png';
import icon_radio_empty from '../../../assets/images/icon_radio_empty.png';

class NewDataPoint extends Component { 

    constructor(props){
        super(props)
        this.state = {
            dp_name: '',
            dp_type: '',
            dp_region: '',
        }
    }

    componentDidMount = () => {
        
    }

    insertFDP = () => {

        let { dp_name, dp_type, dp_region } = this.state;

        if ( dp_name === '' ) {
            swal("Please input Data point name.");
            return;
        }

        if ( dp_type === '' ) {
            swal("Please choose Type of data point.");
            return;
        }

        if ( dp_region === '' ) {
            swal("Please select Region.");
            return;
        }

        let data = JSON.stringify({
            "DataPointName": dp_name,
            "TypeOfDataPoint": dp_type,
            "Region": dp_region,
        });

        this.props.insertFDP(data, this.cbDash);
    }

    cbDash = () => {
        swal({
            text: "The FDP is being deployed. You will see the FDP in your dashboard in a minute.",
        })
        .then( ()=> {
            this.props.history.push('./dashboard');
        });
    }

    render() { 

        const { dp_name, dp_type, dp_region } = this.state;
 
        return (             
            <div >
                <Header1 {...this.props}/>
                
                <div className="set-container w-m">
                    <p className="title-main">New FAIR Data Points</p>
                    <p className="title-sub">
                        Give your new FAIR Data Point a name and select a geographical location.
                    </p>

                    <div className="divider"></div> 

                    <div className="set-input">
                        <fieldset >
                            <p className="title-input"> FAIR Data Point name </p>
                            <input type="text" placeholder="" value={dp_name} onChange={(e) => this.setState({dp_name: e.target.value}) } />
                        </fieldset>
                        
                        <fieldset >
                            <p className="title-input">Type of FAIR Data Point</p>
                            <div className="set-multi">
                                <button className={dp_type === 'FDP' ? "btn_apply" : ""} onClick={() => this.setState({dp_type: dp_type === 'FDP' ? '' : 'FDP'})}><img src={dp_type === 'FDP' ? icon_radio_fill : icon_radio_empty} alt="icon" /> FDP</button>
                                <button className={dp_type === 'VODAN FDP' ? "btn_apply" : ""} onClick={() => this.setState({dp_type: dp_type === 'VODAN FDP' ? '' : 'VODAN FDP'})}><img src={dp_type === 'VODAN FDP' ? icon_radio_fill : icon_radio_empty} alt="icon" /> VODAN FDP</button>
                            </div>
                        </fieldset>
                        
                        <fieldset >
                            <p className="title-input">Region</p>
                            <div className="set-multi">
                                <button className={dp_region === 'US' ? "btn_apply" : ""} onClick={() => this.setState({dp_region: dp_region === 'US' ? '' : 'US'})}><img src={dp_region === 'US' ? icon_radio_fill : icon_radio_empty} alt="icon" /> US</button>
                                <button className={dp_region === 'Europe' ? "btn_apply" : ""} onClick={() => this.setState({dp_region: dp_region === 'Europe' ? '' : 'Europe'})}><img src={dp_region === 'Europe' ? icon_radio_fill : icon_radio_empty} alt="icon" /> Europe</button>
                                <button className={dp_region === 'Asia' ? "btn_apply" : ""} onClick={() => this.setState({dp_region: dp_region === 'Asia' ? '' : 'Asia'})}><img src={dp_region === 'Asia' ? icon_radio_fill : icon_radio_empty} alt="icon" /> Asia</button>
                            </div>
                        </fieldset>
                        
                    </div>

                    <button className="btn-bottom btn_apply" onClick={this.insertFDP}> Create FAIR Data Point </button>

                </div>
            </div>
            
        );            
    }
}


const mapStateToProps = ({ auth }) => {
    const {
        isAuthenticated,
    } = auth;
    return {
        isAuthenticated,
    }
};

const mapDispatchToProps = { 
    insertFDP,
};

NewDataPoint = connect(mapStateToProps, mapDispatchToProps)(NewDataPoint)
export default NewDataPoint;
