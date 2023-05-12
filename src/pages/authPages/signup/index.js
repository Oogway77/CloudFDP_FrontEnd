import React, {Component} from 'react';
import countryList from 'react-select-country-list';

// redux
import { connect } from 'react-redux';
import { register } from '../../../redux/actions';

// components
import swal from 'sweetalert';

// other function
import * as funcs from '../../../common/functions';

class SignUp extends Component {  
    constructor(props){
        super(props)
        this.state = {
            userFirstName: '',
            userLastName: '',
            userEmail: '',
            userPassword: '',
            confirmPW: '',
            userOrganization: '',
            userAddress: '',
            userPostcode: '',
            userCity: '',
            userCountry: 'Choose Country',
            options: [],
                        
        }
        this.userFirstNameInput = React.createRef();
        this.userLastNameInput = React.createRef();
        this.userEmailInput = React.createRef();
        this.userPasswordInput = React.createRef();
        this.userRepeatInput = React.createRef();
        this.userOrganizationInput = React.createRef();
        this.userStreetInput = React.createRef();
        this.userPostcodeInput = React.createRef();
        this.userCityInput = React.createRef();
        this.userCountryInput = React.createRef();
    }

    componentDidMount = () => {
        this.setState({options: countryList().getData()});
        this.userFirstNameInput.current.focus();
    }

    onRegister = () => {

        let { userFirstName, userLastName, userEmail, userPassword, confirmPW, userOrganization, userAddress, userPostcode, userCity, userCountry } = this.state;
        
        let _this = this;
        if ( userFirstName === '') {            
            swal('Please input First name.').then(function(){
                swal.close();
                _this.userFirstNameInput.current.focus();
            });            
            return;
        }
        
        if ( userLastName === '' ) {            
            swal('Please input Last name.').then(function(){
                swal.close();
                _this.userLastNameInput.current.focus();
            });
            return;
        }        
        
        if ( userEmail === '' || !funcs.validateEmail(userEmail)) {            
            swal('Please input correct Email.').then(function(){
                swal.close();
                _this.userEmailInput.current.focus();
            });
            return;
        }
        
        if ( userPassword === '' ) {            
            swal('Please input Password').then(function(){
                swal.close();
                _this.userPasswordInput.current.focus();
            });
            return;
        } 
        
        if ( confirmPW === '' || userPassword !== confirmPW) {            
            swal('Please input confirm password.').then(function(){
                swal.close();
                _this.userRepeatInput.current.focus();
            });
            return;
        } 
        
        if ( userOrganization === '' ) {            
            swal('Please input Organization.').then(function(){
                swal.close();
                _this.userOrganizationInput.current.focus();
            });
            return;
        } 
        
        if ( userAddress === '' ) {            
            swal('Please input Address.').then(function(){
                swal.close();
                _this.userStreetInput.current.focus();
            });
            return;
        } 
        
        if ( userPostcode === '' ) {            
            swal('Please input Postcode.').then(function(){
                swal.close();
                _this.userPostcodeInput.current.focus();
            });
            return;
        } 
        
        if ( userCity === '' ) {            
            swal('Please input City.').then(function(){
                swal.close();
                _this.userCityInput.current.focus();
            });
            return;
        } 
        
        if ( userCountry === 'Choose Country' ) {            
            swal('Please choose Country.').then(function(){
                swal.close();
                _this.userCountryInput.current.focus();
            });
            return;
        }
        
        // process
        let data = JSON.stringify({
            "Firstname": userFirstName,
            "Lastname": userLastName,
            "Password": userPassword,
            "Email": userEmail,
            "Organization": userOrganization,
            "StreetAddress": userAddress,
            "Postcode": userPostcode,
            "City": userCity,
            "Country": userCountry
        });  

        this.props.register(data, this.callback);        
    }

    callback = () => {
        let _this = this;
        swal("Successfully registered.").then(function(){
            swal.close();
            _this.props.history.push('/auth/sign_in')
        });        
    }    
    
    setOnlyNum = (e, str) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ [str]: onlyNums });
    }

    render() { 

        const { history } = this.props;
        const { userFirstName, userLastName, userEmail, userPassword, confirmPW, userOrganization, userAddress, userPostcode, userCity, userCountry, options } = this.state;

        return (            
            <div className="set-container w-m">
                <p className="title-main">Create an account</p>
                <p className="title-sub">
                    Follow the from below to create your account <br/>
                    Already have an account? 
                    <span onClick={() => history.push('/auth/sign_in')}> Log in </span>
                </p>

                <div className="divider"></div> 

                <div className="set-input">
                    <div className="set-multi">
                        <fieldset className="double">
                            <p className="title-input">First name</p>
                            <input ref={this.userFirstNameInput} type="text" placeholder="" value={userFirstName} onChange={(e) => this.setState({userFirstName: e.target.value}) } />
                        </fieldset>
                        
                        <fieldset className="double">
                            <p className="title-input">Last name</p>
                            <input ref={this.userLastNameInput} type="text" placeholder="" value={userLastName} onChange={(e) => this.setState({userLastName: e.target.value}) } />
                        </fieldset>
                    </div>
                    
                    <fieldset >
                        <p className="title-input">Email address</p>
                        <input ref={this.userEmailInput} type="text" placeholder="" value={userEmail} onChange={(e) => this.setState({userEmail: e.target.value}) } />
                    </fieldset>

                    <div className="set-multi">
                        <fieldset className="double">
                            <p className="title-input">Password</p>
                            <input ref={this.userPasswordInput} type="password" placeholder="" value={userPassword} onChange={(e) => this.setState({userPassword: e.target.value}) } />
                        </fieldset>
                        
                        <fieldset className="double">
                            <p className="title-input">Repeat password</p>
                            <input ref={this.userRepeatInput} type="password" placeholder="" value={confirmPW} onChange={(e) => this.setState({confirmPW: e.target.value}) } />
                        </fieldset>
                    </div>
                    
                    <fieldset >
                        <p className="title-input">Organization</p>
                            <input ref={this.userOrganizationInput} type="text" placeholder="" value={userOrganization} onChange={(e) => this.setState({userOrganization: e.target.value}) } />
                    </fieldset>
                    
                    <fieldset >
                        <p className="title-input">Street address</p>
                            <input ref={this.userStreetInput} type="text" placeholder="" value={userAddress} onChange={(e) => this.setState({userAddress: e.target.value}) } />
                    </fieldset>

                    <div className="set-multi">
                        <fieldset className="double">
                            <p className="title-input">Postcode</p>
                            <input ref={this.userPostcodeInput} type="text" placeholder="" value={userPostcode} onChange={(e) => this.setState({userPostcode: e.target.value}) } />
                        </fieldset>
                        
                        <fieldset className="double">
                            <p className="title-input">City</p>
                            <input ref={this.userCityInput} type="text" placeholder="" value={userCity} onChange={(e) => this.setState({userCity: e.target.value}) } />
                        </fieldset>
                    </div>
                    
                    <fieldset >
                        <p className="title-input">Country</p> 
                        <select ref={this.userCountryInput} value={userCountry} onChange={(e) => this.setState({userCountry: e.target.value})}>
                            <option value="Choose Country">Choose Country</option>
                            {
                                options.map(item => 
                                    <option key={item.value} value={item.label}>{item.label}</option>                                    
                                )
                            }
                        </select>
                    </fieldset>

                </div>

                <p className="detail">
                    By clicking the "Create account" button, you are creating a Fair Data Point account,  <br />
                    and you agree to the  <span> Terms of Use </span> and <span> Privacy Policy.</span>
                </p>

                <button className="btn-bottom btn_apply" onClick={this.onRegister}>Create account</button>

            </div> 
            
        );            
    }
}


const mapStateToProps = ({ normal }) => {

    const {
        bankList,
    } = normal;

    return {
        bankList
    }
};

const mapDispatchToProps = { 
    register: register,
};

SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUp)
export default SignUp;
