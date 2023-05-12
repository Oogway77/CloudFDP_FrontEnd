import React, {Component} from 'react';
import countryList from 'react-select-country-list';

// redux
import { connect } from 'react-redux';
import { getUserOrgData, updateUserOrgInfo } from '../../../redux/actions';

// components
import swal from 'sweetalert';
import Header1 from '../../../components/Header1';

// images
// import icon_visa from '../../../assets/images/icon_visa.png';

class EditOrganization extends Component { 

    constructor(props){
        super(props)
        this.state = {
            orgName: '',
            address: '',
            postcode: '',
            city: '',
            country: 'Choose country',
            payMethod: 'Choose Method',
            holderName: '',
            cardNum: '',
            cvc: '',
            validThrough: '',
            options: [],
        }
    }

    componentDidMount = () => {
        this.setState({options: countryList().getData()})
        this.getUserOrgData();
    }

    getUserOrgData = () => {         
        this.props.getUserOrgData( '', this.resetState);
    }

    resetState = () => {
        const { userOrgData } = this.props;

        this.setState({
            orgName: userOrgData.Organization,
            address: userOrgData.StreetAddress,
            postcode: userOrgData.Postcode,
            city: userOrgData.City,
            country: userOrgData.Country,
            // payMethod: userOrgData,
            // holderName: userOrgData,
            // cardNum: userOrgData,
            // cvc: userOrgData,
            // validThrough: userOrgData, 
        })

    }

    updateUserOrgInfo = () => {

        const { userOrgData } = this.props;

        let { orgName, address, postcode, city, country, } = this.state;

        if ( orgName === '' ) {
            swal("Please input Organization.");
            return;
        }

        if ( address === '' ) {
            swal("Please input Street address.");
            return;
        }

        if ( postcode === '' ) {
            swal("Please input Postcode.");
            return;
        }

        if ( city === '' ) {
            swal("Please input City.");
            return;
        }

        if ( country === 'Choose country' ) {
            swal("Please choose country.");
            return;
        }

        let data = JSON.stringify({
            "_id": userOrgData._id,
            "Organization": orgName,
            "StreetAddress": address,
            "PostCode": postcode,
            "City": city,
            "Country": country,
            // "PaymentMethod": "Payment1",
            // "CardHolderName": "CardHoldername1",
            // "CardNumber":"42424242424242424242",
            // "CVC": "124",
            // "ValidThrough": "02/24",
            // "Status": "Inactive"
        });

        this.props.updateUserOrgInfo(data, this.callback);
    }

    callback = () => {
        let _this = this;
        swal("Successfully updated.").then(function(){
            swal.close();
            _this.props.history.push('/dashboard')
        });        
    }
    
    setOnlyNum = (e, str) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ [str]: onlyNums });
    }

    onCheckState = () => {
        const { orgName, address, postcode, city, country } = this.state;
        const { userOrgData } = this.props;
        
        if (
                userOrgData.Organization === undefined ||
                (   userOrgData.Organization === orgName &&
                    userOrgData.StreetAddress === address &&
                    userOrgData.Postcode === postcode &&
                    userOrgData.City === city &&
                    userOrgData.Country === country
            ))
            return true;
        
        return false;
    }

    render() { 

        const { orgName, address, postcode, city, country, options,
            //  payMethod, holderName, cardNum, cvc, validThrough 
            } = this.state;
 
        let disable = this.onCheckState();
 
        return (             
            <div >
                <Header1 {...this.props}/>
                
                <div className="set-container w-m">
                    <p className="title-main"> Edit organization </p>
                    <p className="title-sub">
                        Manage your organization details here.
                    </p>

                    <div className="divider"></div> 

                    <div className="set-input">
                    
                        <fieldset >
                            <p className="title-input">Organization</p>
                                <input type="text" placeholder="" value={orgName} onChange={(e) => this.setState({orgName: e.target.value}) } />
                        </fieldset>
                        
                        <fieldset >
                            <p className="title-input">Street address</p>
                                <input type="text" placeholder="" value={address} onChange={(e) => this.setState({address: e.target.value}) } />
                        </fieldset>

                        <div className="set-multi">
                            <fieldset className="double">
                                <p className="title-input">Postcode</p>
                                <input type="text" placeholder="" value={postcode} onChange={(e) => this.setState({postcode: e.target.value}) } />
                            </fieldset>
                            
                            <fieldset className="double">
                                <p className="title-input">City</p>
                                <input type="text" placeholder="" value={city} onChange={(e) => this.setState({city: e.target.value}) } />
                            </fieldset>
                        </div>
                        
                        <fieldset >
                            <p className="title-input">Country</p> 
                            <select value={country} onChange={(e) => this.setState({country: e.target.value})}>
                                <option value="Choose country">Choose Country</option>
                                {
                                    options.map(item => 
                                        <option key={item.value} value={item.label}>{item.label}</option>                                    
                                    )
                                }
                            </select>
                        </fieldset>
                    
                        {/* <fieldset >
                            <p className="title-input">Payment method</p> 
                            <select value={payMethod} onChange={(e) => this.setState({payMethod: e.target.value})}>
                                <option value="Choose Method">Choose Method</option>
                                <option value="Credit card">Credit card</option>
                            </select>
                        </fieldset> */}

                        {/* <fieldset >
                            <p className="title-input"> Card holder name </p>
                            <input type="text" placeholder="" value={holderName} onChange={(e) => this.setState({holderName: e.target.value}) } />
                        </fieldset> */}

                        {/* <div className="set-multi">
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
                        </div> */}
                        
                    </div>

                    <button className="btn-bottom btn_apply" disabled={disable} onClick={this.updateUserOrgInfo}> Save changes </button>

                </div>
            </div>
            
        );            
    }
}


const mapStateToProps = ({ auth, user }) => {
    const {
        clientInfo,
    } = auth;

    const {
        userOrgData,
    } = user;

    return {
        clientInfo,
        userOrgData,
    }
};

const mapDispatchToProps = { 
    getUserOrgData,
    updateUserOrgInfo
};

EditOrganization = connect(mapStateToProps, mapDispatchToProps)(EditOrganization)
export default EditOrganization;
