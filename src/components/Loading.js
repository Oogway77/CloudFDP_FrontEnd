import React, {Component} from 'react';

import loadingImg from '../assets/images/Loading.gif';

class Loading extends Component {  

    render() { 
        return (
            <div style={{position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, zIndex: 10001, textAlign: 'center', margin: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                <img
                    src={loadingImg}
                    alt="user"
                    className="loading-circle"
                    width="150"
                    style={{position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, zIndex: 10001, textAlign: 'center', margin: 'auto'}}
                />
            </div>
        );
    }
}

export default Loading;
