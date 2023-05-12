import React, {Component} from 'react';

// other function
import * as funcs from '../../../../common/functions';

class General extends Component {   
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    } 

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() { 

        const { fdpData, fdpDtStatus } = this.props;

        return (
            <div className="main-container">    
                <div className="divider"> </div> 
                <div className="sub-container">
                    
                    <p className="title-main"> General Information </p>

                    <div className="GI-container">
                        <div className="GI-item">
                            <p className="title-in"> FDP name </p>
                            <p className="data-txt"> {fdpData.DataPointName} </p>                            
                        </div>
                        <div className="GI-item">
                            <p className="title-in"> Version </p>
                            <p className="data-num"> {fdpData.Version} </p>                            
                        </div>
                        <div className="GI-item">
                            <p className="title-in"> Created on </p>
                            <p className="data-num"> {funcs.getLocalDate(fdpData.createdAt)} </p>                            
                        </div>
                        <div className="GI-item">
                            <p className="title-in"> Last retrieved on </p>
                            <p className="data-num"> {funcs.getLocalDate(fdpData.updatedAt)} </p>                            
                        </div>
                        <div className="GI-item" style={{width: '100%'}}>
                            <p className="title-in"> Running status </p>
                            <div style={{display: 'flex'}}>
                                <p className="data-num"> 
                                    {fdpDtStatus.status === undefined ? 'Waiting...' : fdpDtStatus.status} 
                                </p>  
                                {
                                    fdpDtStatus.status === undefined || (fdpDtStatus.status !== 'Running...' && fdpDtStatus.status !== 'Terminated') ? 
                                    <div className="loader"></div> 
                                    :
                                    <div className="link" onClick={() => window.open("https://"+fdpDtStatus.link, "_blank")}>{fdpDtStatus.status === 'Running...' && 'Goto FDP'}</div>
                                }                    
                                 
                            </div>     
                        </div>
                    </div>

                </div>
            </div>
        );            
    }
}

export default General;
