import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { inviteUser } from '../../../redux/actions';

// components
import swal from 'sweetalert';
import Header1 from '../../../components/Header1';

// other function
import * as funcs from '../../../common/functions';

// images
import icon_radio_fill from '../../../assets/images/icon_radio_fill.png';
import icon_radio_empty from '../../../assets/images/icon_radio_empty.png';
import icon_arrow_left from '../../../assets/images/icon_arrow_left.png';

class InviteNewUser extends Component { 

    constructor(props){
        super(props)
        this.state = {
            user_email: '',
            user_role: '',
            sendFlag: false,
        }
    }

    componentDidMount = () => {
        
    }

    onLogin = () => {

        let { user_email, user_role } = this.state;

        if ( user_email === '' || !funcs.validateEmail(user_email)) { 
            swal('Please input correct Email.');
            return;
        }

        if ( user_role === '') { 
            swal('Please choose a User role.');
            return;
        }

        let data = JSON.stringify({
            "email": user_email,
            "role": user_role,
        });

        this.props.inviteUser(data, () => this.setState({sendFlag: true}));
    }

    render() { 

        const { history } = this.props;
        const { user_email, user_role, sendFlag } = this.state;
 
        return (             
            <div >
                <Header1 {...this.props}/>
                
                <div className="set-container w-m">
                {
                    !sendFlag ? (
                        <div>
                            <p className="title-main">Invite a new user</p>
                            <p className="title-sub">
                                Your new user will receive a link to create their account and join your organization.
                            </p>

                            <div className="divider"></div> 

                            <div className="set-input">
                                <fieldset >
                                    <p className="title-input"> Email address </p>
                                    <input type="text" placeholder="" value={user_email} onChange={(e) => this.setState({user_email: e.target.value}) } />
                                </fieldset>
                                
                                <fieldset >
                                    <p className="title-input"> User role </p>
                                    <div className="set-multi">
                                        <button className={user_role === 'User' ? "btn_apply" : ""} onClick={() => this.setState({user_role: user_role === 'User' ? '' : 'User'})}><img src={user_role === 'User' ? icon_radio_fill : icon_radio_empty} alt="icon" /> User</button>
                                        <button className={user_role === 'Admin' ? "btn_apply" : ""} onClick={() => this.setState({user_role: user_role === 'Admin' ? '' : 'Admin'})}><img src={user_role === 'Admin' ? icon_radio_fill : icon_radio_empty} alt="icon" /> Admin</button>
                                    </div>
                                </fieldset>
                                
                            </div>

                            <button className="btn-bottom btn_apply" onClick={this.onLogin}> Send invitation </button>
                        </div>
                    ) : (                        
                        <div>
                            <p className="title-sub">
                                An invitation link has been sent to <span> {user_email} </span>. This link is valid for 7 days. 
                            </p>
                            
                            <button className="btn-bottom btn_back" onClick={() => history.push('/dashboard')}> <img src={icon_arrow_left} alt="icon" /> Back to Home</button>
                        </div>
                    )
                }
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
    inviteUser,
};

InviteNewUser = connect(mapStateToProps, mapDispatchToProps)(InviteNewUser)
export default InviteNewUser;
