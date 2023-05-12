import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getUserData, updateUserStatus, deleteUser } from '../../../redux/actions';

// components
import swal from 'sweetalert';
import queryString from 'query-string';
import Header2 from '../../../components/Header2';
import Menu from './components/Menu';
import Info from './components/Info';
import General from './components/General';
import Recent from './components/Recent';

class User extends Component {   
    constructor(props){
        super(props)
        this.state = {
            selID: 0,
        }
        
    } 
   
    componentDidMount = async() => {    
        const { search } = this.props.location;        
        if(search !== ""){
            let params = queryString.parse(search);
            if (params.request1 !== undefined) {
                this.getUserData(params.request1);
                return ;
            }
        }
        
        swal('It is the wrong access.').then((result)=>{
            this.props.history.push("/dashboard");
            // return;
        })        
    }

    callVoid = () => {

    }

    getUserData = (id) => {
        
        let data = JSON.stringify({
            "Id": id,
        });

        this.props.getUserData(data, this.callVoid);
    }

    updateUserStatus = () => {

        const { userData } = this.props;
        
        let data = JSON.stringify({
            "Id": userData._id,
            "Status": userData.status === 'Active' ? 'Inactive' : 'Active'
        });

        this.props.updateUserStatus(data, () => this.getUserData(userData._id));
    }

    deleteUser = () => {
        
        let data = JSON.stringify({
            "Id": this.props.userData._id,
        });

        this.props.deleteUser(data, () => this.props.history.push("/dashboard"));
    }

    render() { 

        return (            
            <div className="dashboard">
                <Header2 {...this.props}/>
                <Menu {...this.props} updateUserStatus={this.updateUserStatus} deleteUser={this.deleteUser}/>
                <Info {...this.props}/>                 
                <General {...this.props}/> 
                <Recent {...this.props}/>  
            </div>
            
        );            
    }
}


const mapStateToProps = ({ user }) => {
    const {
        userData,
    } = user;
    return {
        userData,
    }
};

const mapDispatchToProps = { 
    getUserData,
    updateUserStatus,
    deleteUser,
 };


User = connect(mapStateToProps, mapDispatchToProps)(User)
export default User;
