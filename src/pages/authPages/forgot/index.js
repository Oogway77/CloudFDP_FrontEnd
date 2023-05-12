import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { resetPassword } from '../../../redux/actions';

// components
import swal from 'sweetalert';

// other function
import * as funcs from '../../../common/functions';

// images
import icon_arrow_left from '../../../assets/images/icon_arrow_left.png';
import icon_email from '../../../assets/images/icon_email.png';

class ForgotPW extends Component {  
    constructor(props){
        super(props)
        this.state = {
            user_email: '',
            sendFlag: false,
        }
    }

    componentDidMount = () => {
        
    }

    onForgotPW = () => {

        let { user_email } = this.state;

        if ( user_email === '' || !funcs.validateEmail(user_email)) {            
            swal('Please input correct Email.');
            return;
        }

        let data = JSON.stringify({
            "email": user_email,
        });

        this.props.resetPassword(data, () => this.setState({sendFlag: true}));
    }

    render() { 

        const { history } = this.props;

        const { user_email, sendFlag } = this.state;

        return (            
            <div className="set-container w-s">
                <p className="title-main">Forgot password</p>
                {
                    !sendFlag ? (
                        <div>
                            <p className="title-sub">
                                Enter your email address to receive a<br/>
                                password recovery link.<br/>
                                Remember your password now? 
                                <span onClick={() => history.push('/auth/sign_in')}> Log in</span>
                            </p>

                            <div className="divider"></div> 

                            <div className="set-input">
                                <fieldset >
                                    <p className="title-input">Email address</p>
                                    <div className="icon-input">
                                        <img src={icon_email} alt="icon" />
                                        <input type="text" placeholder="" value={user_email} onChange={(e) => this.setState({user_email: e.target.value}) } onKeyDown={(e) => {if (e.keyCode === 13) this.onForgotPW()} }/>
                                    </div>
                                </fieldset>
                            </div>

                            <button className="btn-bottom btn_apply" onClick={this.onForgotPW}>Send recovery link</button>

                        </div>
                    ) : (
                        <div>
                            <p className="title-sub">
                                A recovery link has been sent to <span> {user_email} </span>. Please click that link to recover you account. 
                            </p>
                            
                            <button className="btn-bottom btn_back" onClick={() => history.push('/auth/sign_in')}> <img src={icon_arrow_left} alt="icon" /> Back to login</button>
                        </div>
                    )
                }
            </div>                
        );            
    }
}

const mapDispatchToProps = { 
    resetPassword,
};

ForgotPW = connect(null, mapDispatchToProps)(ForgotPW)
export default ForgotPW;
