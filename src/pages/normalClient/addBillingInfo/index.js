import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { login } from '../../../redux/actions';

// components
import swal from 'sweetalert';
import Header1 from '../../../components/Header1';

// images
import icon_visa from '../../../assets/images/icon_visa.png';

class AddBillingInfo extends Component { 

    constructor(props){
        super(props)
        this.state = {
            payMethod: 'Choose Method',
            holderName: '',
            cardNum: '',
            cvc: '',
            validThrough: ''
        }
    }

    componentDidMount = () => {
        
    }

    onLogin = () => {

        let { userName, userPassword } = this.state;

        if ( userName === '' ) {
            swal("Please input correct Email address.");
            return;
        }

        if ( userPassword === '' ) {
            swal("Please input Password.");
            return;
        }

        // let data = JSON.stringify({
        //     "MemberAccount": userName,
        //     "MemberPassword": userPassword,
        // });

        // this.props.login(data, this.callVoid);
    }

    callVoid = () => {
        
    }
    
    setOnlyNum = (e, str) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ [str]: onlyNums });
    }

    render() { 

        const { payMethod, holderName, cardNum, cvc, validThrough } = this.state;
 
        return (             
            <div >
                <Header1 {...this.props}/>
                
                <div className="set-container w-m">
                    <p className="title-main">Add billing information</p>
                    <p className="title-sub">
                        Provide your billing information to get your data point up and running. You only have to do this once.
                    </p>

                    <div className="divider"></div> 

                    <div className="set-input">
                    
                        <fieldset >
                            <p className="title-input">Payment method</p> 
                            <select value={payMethod} onChange={(e) => this.setState({payMethod: e.target.value})}>
                                <option value="Choose Method">Choose Method</option>
                                <option value="Credit card">Credit card</option>
                            </select>
                        </fieldset>

                        <fieldset >
                            <p className="title-input"> Card holder name </p>
                            <input type="text" placeholder="" value={holderName} onChange={(e) => this.setState({holderName: e.target.value}) } />
                        </fieldset>

                        {/* <fieldset >
                            <p className="title-input"> Confirmation code </p>
                            <input type="text" placeholder="Enter the confirmation code provided by us. " value={holderName} onChange={(e) => this.setState({holderName: e.target.value}) } />
                        </fieldset> */}

                        <div className="set-multi">
                            <fieldset className="double">
                                <p className="title-input">Card number</p>
                                <div className="icon-input">
                                    <img src={icon_visa} alt="icon" />
                                    <input type="text" placeholder="" value={cardNum} onChange={(e) => this.setOnlyNum(e, 'cardNum') } />
                                </div>
                            </fieldset>

                            <div className="double set-multi">
                                <fieldset className="double">
                                    <p className="title-input">CVC</p>
                                    <input type="text" placeholder="" value={cvc} onChange={(e) => this.setState({cvc: e.target.value}) } />
                                </fieldset>
                                
                                <fieldset className="double">
                                    <p className="title-input">Valid through</p>
                                    <input type="text" placeholder="MM/YY" value={validThrough} onChange={(e) => this.setState({validThrough: e.target.value}) } />
                                </fieldset>
                            </div>
                        </div>
                        
                    </div>


                    <button className="btn-bottom btn_apply" onClick={this.onLogin}> Submit billing information </button>


                    <p className="detail">
                        By clicking the "Submit billing information" button, you are authorizing to charge your card on a monthly basis for your usage per <span> our pricing </span>.
                    </p>

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
    login,
};

AddBillingInfo = connect(mapStateToProps, mapDispatchToProps)(AddBillingInfo)
export default AddBillingInfo;
