import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { inviteReply, getInviteInfo } from '../../../redux/actions';

// components
import swal from 'sweetalert';
import queryString from 'query-string';

// other function
import * as funcs from '../../../common/functions';

class SignUpInvite extends Component {  
    constructor(props){
        super(props)
        this.state = {
            user_FirstName: '',
            user_LastName: '',
            user_Email: '',
            user_Password: '',
            confirmPW: '',
            user_role: '',                  
        }
        this.userFirstNameInput = React.createRef();
        this.userLastNameInput = React.createRef();
        this.userPasswordInput = React.createRef();
        this.userRepeatInput = React.createRef();
    }

    componentDidMount = () => {
        this.userFirstNameInput.current.focus();

        const { search } = this.props.location;
        if(search !== "") {
            let params = queryString.parse(search);
            if (params.token !== undefined) {
                let data = JSON.stringify({   
                    "token": params.token,
                });
                this.props.getInviteInfo( data, this.onSetInfo );
                return ;
            }
        }
        
        swal('It is the wrong token.').then((result)=>{
            swal.close();
            this.props.history.push("/auth/sign_in");
            // return;
        })
    }

    onSetInfo = () => {

        const { inviteInfo } = this.props;
        
        this.setState({
            user_Email: inviteInfo.email,
            user_role: inviteInfo.role
        });
    }

    inviteReply = () => {

        let { user_FirstName, user_LastName, user_Email, user_Password, confirmPW, user_role 
        } = this.state;
        
        let _this = this;
        if ( user_FirstName === '') {            
            swal('Please input First name.').then(function(){
                swal.close();
                _this.userFirstNameInput.current.focus();
            });            
            return;
        }
        
        if ( user_LastName === '' ) {            
            swal('Please input Last name.').then(function(){
                swal.close();
                _this.userLastNameInput.current.focus();
            });
            return;
        }        
        
        if ( user_Email === '' || !funcs.validateEmail(user_Email)) {            
            swal('Be not correct Email address.');
            return;
        }
        
        if ( user_Password === '' ) {            
            swal('Please input Password').then(function(){
                swal.close();
                _this.userPasswordInput.current.focus();
            });
            return;
        } 
        
        if ( confirmPW === '' || user_Password !== confirmPW) {            
            swal('Please input confirm password.').then(function(){
                swal.close();
                _this.userRepeatInput.current.focus();
            });
            return;
        } 
        
        // process
        let data = JSON.stringify({
            "firstname" : user_FirstName,
            "lastname" : user_LastName,
            "password" : user_Password,
            "email" : user_Email,            
	        "role": user_role
        });  

        this.props.inviteReply(data, this.onGoSignin);        
    }

    onGoSignin = () => {
        let _this = this;
        swal("Successfully registered.").then(function(){
            swal.close();
            _this.props.history.push('/auth/sign_in')
        });        
    }

    render() { 

        const { user_FirstName, user_LastName, user_Email, user_Password, confirmPW } = this.state;

        return (            
            <div className="set-container w-m">
                <p className="title-main">Create an account</p>
                <p className="title-sub">
                    Complete your profile to join <strong> Fair Data Solution </strong>
                </p>

                <div className="divider"></div> 

                <div className="set-input">
                    <div className="set-multi">
                        <fieldset className="double">
                            <p className="title-input">First name</p>
                            <input ref={this.userFirstNameInput} type="text" placeholder="" value={user_FirstName} onChange={(e) => this.setState({user_FirstName: e.target.value}) } />
                        </fieldset>
                        
                        <fieldset className="double">
                            <p className="title-input">Last name</p>
                            <input ref={this.userLastNameInput} type="text" placeholder="" value={user_LastName} onChange={(e) => this.setState({user_LastName: e.target.value}) } />
                        </fieldset>
                    </div>
                    
                    <fieldset >
                        <p className="title-input">Email address</p>
                        <input type="text" placeholder="" readOnly value={user_Email} />
                    </fieldset>

                    <div className="set-multi">
                        <fieldset className="double">
                            <p className="title-input">Password</p>
                            <input ref={this.userPasswordInput} type="password" placeholder="" value={user_Password} onChange={(e) => this.setState({user_Password: e.target.value}) } />
                        </fieldset>
                        
                        <fieldset className="double">
                            <p className="title-input">Repeat password</p>
                            <input ref={this.userRepeatInput} type="password" placeholder="" value={confirmPW} onChange={(e) => this.setState({confirmPW: e.target.value}) } />
                        </fieldset>
                    </div>
                </div>

                <button className="btn-bottom btn_apply" onClick={this.inviteReply}>Create account</button>

                <p className="detail">
                    By clicking the "Create account" button, you are creating a Fair Data Point account,  <br />
                    and you agree to the  <span> Terms of Use </span> and <span> Privacy Policy.</span>
                </p>

            </div> 
            
        );            
    }
}


const mapStateToProps = ({ auth }) => {

    const {
        inviteInfo,
    } = auth;

    return {
        inviteInfo
    }
};

const mapDispatchToProps = { 
    inviteReply, 
    getInviteInfo,
};

SignUpInvite = connect(mapStateToProps, mapDispatchToProps)(SignUpInvite)
export default SignUpInvite;
