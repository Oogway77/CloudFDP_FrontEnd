import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { updateOrgStatus, getOrgData, deleteOrg } from '../../../../redux/actions';

// components
import swal from 'sweetalert';

// images
import icon_edit from '../../../../assets/images/icon_edit.png';
import icon_minus from '../../../../assets/images/icon_minus.png';


class Menu extends Component {  
    
    constructor(props){
        super(props)
        this.state = {
            showMenu: false,
        }        
    } 

    componentDidMount = () => {
        document.addEventListener('mouseup', this.mouseUp);
    }

    componentWillUnmount = () => {
        document.removeEventListener('mouseup', this.mouseUp);
    }

    mouseUp = (e) => {

        const { showMenu } = this.state;

        if (e.target.id === 'menu' && showMenu === true) {
            return ;
        }
        this.setState({
            showMenu: false,
        })
    }

    updateOrgStatus = (id, status) => {

        const { orgData } = this.props;

        if (orgData._id === undefined)
            swal('It is the wrong access.').then((result)=>{
                this.props.history.push("/dashboard");
                return;
            });            

        swal({
            title: "Are you sure?",
            buttons: true
        })
        .then(confirm => {
            if (confirm) {

                let data = JSON.stringify({
                    "OrganizationId": orgData._id,
                    "Status": orgData.Status === 'Active' ? 'Inactive' : 'Active'
                });
        
                this.props.updateOrgStatus(data, (flag) => {if (flag !== false) this.getOrgData();});
            }
        });
    }

    getOrgData = () => {

        const { orgData } = this.props;
        
        let data = JSON.stringify({   
            "OrganizationId": orgData._id,
        });          
        this.props.getOrgData( data, this.callVoid);
    }

    callVoid = () => {
        
    }

    deleteOrg = (id, status) => {

        const { orgData } = this.props;

        if (orgData._id === undefined)
            swal('It is the wrong access.').then((result)=>{
                this.props.history.push("/dashboard");
                return;
            });            

        swal({
            title: "Are you sure?",
            buttons: true
        })
        .then(confirm => {
            if (confirm) {

                let data = JSON.stringify({
                    "OrganizationId": orgData._id,
                });
        
                this.props.deleteOrg(data, () => this.props.history.push("/dashboard"));
            }
        });
    }


    render() { 

        const { orgData } = this.props;

        const { showMenu } = this.state;
        
        return (            
            <div className="main-container">
                <div className="main-menu">
                    <div id="menu" className={`extend ${showMenu ? 'active':''}`} onClick={() => this.setState({showMenu: !showMenu})}>
                        {
                            !showMenu ? <img src={icon_edit} alt="icon" /> : <img src={icon_minus} alt="icon" />
                        }
                    </div>
                    <div className={`panel none ${showMenu ? 'show':'hide'}`}>
                        <button className={`${orgData.Status === 'Active' ? "inactive" : "active"}`} onClick={this.updateOrgStatus}> {orgData.Status === 'Active' ? "Deactivate organization" : "Activate organization"} </button>
                        <button onClick={this.deleteOrg}> Delete organization </button>
                    </div>
                </div>
            </div>
            
        );            
    }
}


const mapStateToProps = ({ organization }) => {

    const {
        orgData,
    } = organization;
    
    return {
        orgData,
    }
};

const mapDispatchToProps = { 
    updateOrgStatus, getOrgData, deleteOrg
 };


Menu = connect(mapStateToProps, mapDispatchToProps)(Menu)
export default Menu;
