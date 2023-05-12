import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { login } from '../../../redux/actions';

// components
import swal from 'sweetalert';

// other function
import * as funcs from '../../../common/functions';

// images
import icon_chk_ept from '../../../assets/images/icon_chk_ept.png';
import icon_chk_fill from '../../../assets/images/icon_chk_fill.png';
import icon_email from '../../../assets/images/icon_email.png';
import icon_locked from '../../../assets/images/icon_locked.png';

class SignIn extends Component {  
    constructor(props){
        super(props)
        this.state = {
            user_email: localStorage.getItem('user_email') === null ? '' : localStorage.getItem('user_email'),
            user_Password: '',
            user_rmme: localStorage.getItem('user_rmme') === null ? '' : localStorage.getItem('user_rmme')
        }
        this.userEmailInput = React.createRef();
        this.userPasswordInput = React.createRef();
    }

    componentDidMount = () => {
        this.userEmailInput.current.focus();        
    }

    onLogin = () => {

        let { user_email, user_Password, user_rmme } = this.state;
        
        let _this = this;

        if ( user_email === '' || !funcs.validateEmail(user_email)) {            
            swal('Please input correct Email.').then(function(){
                swal.close();
                _this.userEmailInput.current.focus();
            });
            return;
        }
        
        if ( user_Password === '' ) {            
            swal('Please input Password').then(function(){
                swal.close();
                _this.userPasswordInput.current.focus();
            });
            return;
        } 

        let data = JSON.stringify({
            "email": user_email,
            "password": user_Password,
        });

        if (user_rmme === 'check') {
            localStorage.setItem('user_email', user_email);
            localStorage.setItem('user_rmme', 'check');
        } else {
            localStorage.setItem('user_email', '');
            localStorage.setItem('user_rmme', '');
        }

        this.props.login(data);
    }

    render() { 

        const { history } = this.props;

        const { user_email, user_Password, user_rmme } = this.state;

        return (            
            <div className="set-container w-s">
                <p className="title-main">Sign in</p>
                <p className="title-sub">
                    Log in using your email to continue. <br/>
                    New here? 
                    <span onClick={() => history.push('/auth/sign_up')}> Create an account</span>
                </p>

                <div className="divider"></div> 

                <div className="set-input">
                    <fieldset >
                        <p className="title-input">Email address</p>
                        <div className="icon-input">
                            <img src={icon_email} alt="icon" />
                            <input ref={this.userEmailInput} type="text" placeholder="" value={user_email} onChange={(e) => this.setState({user_email: e.target.value}) } />
                        </div>
                    </fieldset>
                    
                    <fieldset >
                        <p className="title-input">Password</p>
                        <div className="icon-input">
                            <img src={icon_locked} alt="icon" />
                            <input ref={this.userPasswordInput} type="password" placeholder="" value={user_Password} onChange={(e) => this.setState({user_Password: e.target.value}) } onKeyDown={(e) => {if (e.keyCode === 13) this.onLogin()} } />
                        </div>
                    </fieldset>
                </div>

                <div className="set-other">
                    <div>
                        <img src={user_rmme === 'check' ? icon_chk_fill : icon_chk_ept} alt="icon" onClick={() => this.setState({user_rmme: user_rmme === 'check' ? '' : 'check'})} />
                        <span>Remember me</span>
                    </div>

                    <div>
                        <span className="btn" onClick={() => history.push('/auth/forgot_pw')}>Forgot password?</span>
                    </div>
                </div>

                <button className="btn-bottom btn_apply" onClick={this.onLogin}>Sign in</button>

            </div>                
        );            
    }
}

const mapDispatchToProps = { 
    login
};

SignIn = connect(null, mapDispatchToProps)(SignIn)
export default SignIn;
