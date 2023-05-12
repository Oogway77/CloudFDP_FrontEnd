import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getOrgData } from '../../../../redux/actions';

// components
import swal from 'sweetalert';
import queryString from 'query-string';

// other
import * as funcs from '../../../../common/functions';


class General extends Component {  
    
    componentDidMount = async() => {

        const { search } = this.props.location;

        if(search !== ""){
            let params = queryString.parse(search);
            if (params.request1 !== undefined) {
                let selID = params.request1;    
                
                let data = JSON.stringify({   
                    "OrganizationId": selID,
                });          
                this.props.getOrgData( data, this.callback);
                return ;
            }
        }
        
        swal('It is the wrong access.').then((result)=>{
            this.props.history.push("/dashboard");
            // return;
        })
    }

    callback = (flag) => {
        if (flag === false)
            swal('It is the wrong access.');
    }

    render() { 

        const  { orgData } = this.props;

        return (
            <div className="main-container">    
                <div className="divider"> </div> 
                <div className="sub-container">
                    
                    <p className="title-main"> General Information </p>

                    <div className="GI-container">
                        <div className="GI-item">
                            <p className="title-in"> Organization name </p>
                            <p className="data-txt"> {orgData.Organization} </p>                            
                        </div>
                        <div className="GI-item">
                                                      
                        </div>
                        <div className="GI-item">
                            <p className="title-in"> Created on </p>
                            <p className="data-num"> {funcs.getLocalDate(orgData.createdAt)} </p>                            
                        </div>
                        <div className="GI-item">
                                                      
                        </div>
                        <div className="GI-item">
                            <p className="title-in"> Street address </p>
                            <p className="data-txt"> {orgData.StreetAddress} </p>                            
                        </div>
                        <div className="GI-item">
                            <p className="title-in"> Postcode </p>
                            <p className="data-num"> {orgData.Postcode} </p>                            
                        </div>
                        <div className="GI-item">
                            <p className="title-in"> City </p>
                            <p className="data-num"> {orgData.City} </p>                            
                        </div>
                        <div className="GI-item">
                            <p className="title-in"> Country </p>
                            <p className="data-num"> {orgData.Country} </p>                            
                        </div>
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
    getOrgData
};


General = connect(mapStateToProps, mapDispatchToProps)(General)
export default General;
