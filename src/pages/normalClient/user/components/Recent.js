import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { getUserRecentList } from '../../../../redux/actions';

// other function
import * as funcs from '../../../../common/functions';

// components
import queryString from 'query-string';

// images
import icon_arrow_left from '../../../../assets/images/icon_arrow_left.png';
import icon_arrow_right from '../../../../assets/images/icon_arrow_right.png';


class Recent extends Component {   
    constructor(props){
        super(props)
        this.state = {
            selID: 0,
        }

        this.page = 0;
        this.rowsPerPage = 10;
        
    } 

    componentDidMount = async() => {
        const { search } = this.props.location;        
        if(search !== ""){
            let params = queryString.parse(search);
            if (params.request1 !== undefined) {
                await this.setState({selID: params.request1});
                this.getUserRecentList();
                return ;
            }
        }
    }

    getUserRecentList = () => {

        let data = JSON.stringify({
            "Id": this.state.selID,
            "PageNo": this.page + 1,
            "PageSize": this.rowsPerPage
        });

        this.props.getUserRecentList(data, () => this.setState({sendFlag: true}));
    }

    onBackPage = async() => {

        if (this.page === 0) return;

        this.page = this.page > 0 ? this.page - 1: this.page;

        this.getUserRecentList();
    }

    onNextPage = async() => {

        const { userRecentList } = this.props;

        if (userRecentList.totalRowCount / this.rowsPerPage <= this.page + 1) return;

        let allPage = userRecentList.totalRowCount % this.rowsPerPage === 0 ? userRecentList.totalRowCount / this.rowsPerPage - 1: Math.floor(userRecentList.totalRowCount / this.rowsPerPage);
        
        this.page = this.page  < allPage ? this.page + 1: this.page;

        this.getUserRecentList();
    }

    render() { 

        const { userRecentList } = this.props;

        return (
            <div className="main-container">    
                <div className="divider"> </div> 
                <div className="sub-container">
                    
                    <p className="title-main"> Recent activities </p>

                    <div className="table-rect">
                        <table className="tb-normal">
                            <colgroup>
                                <col width="60%" />
                                <col width="20%" />
                                <col width="20%" />
                            </colgroup>
                            <tbody>
                                <tr >
                                    <th >Event type</th>
                                    <th >Performed  by</th>
                                    <th >Timestamp</th>
                                </tr>
                            {
                                userRecentList.list !== undefined && userRecentList.list
                                .map((item, key) => {
                                    return (
                                        <tr key={'act_' + key} >
                                            <td > {item.Activity} </td>
                                            <td > {item.Username} </td>
                                            <td > {funcs.getLocalDateTime(item.createdAt)} </td>
                                        </tr>  
                                    );
                                })
                            }
                            {
                                userRecentList.totalRowCount !== undefined &&
                                <tr >
                                    <td className="page-txt"> Showing {this.page * this.rowsPerPage + 1} to {this.page * this.rowsPerPage + this.rowsPerPage > userRecentList.totalRowCount ? userRecentList.totalRowCount : this.page * this.rowsPerPage + this.rowsPerPage} of {userRecentList.totalRowCount} entries </td>
                                    <td colSpan={2}> 
                                        <div className="btn-group">
                                            <button className={ userRecentList.totalRowCount / this.rowsPerPage <= this.page + 1 ? "disable" : ""}onClick={this.onNextPage}> Next {this.rowsPerPage} <img src={icon_arrow_right} alt="icon" /> </button>
                                            <button className={this.page === 0 ? "disable" : ""} onClick={this.onBackPage}> <img src={icon_arrow_left} alt="icon" /> Previous {this.rowsPerPage} </button>
                                        </div>
                                    </td>
                                </tr>  
                            }
                            
                            </tbody>
                        </table> 
                    </div>

                </div>
            </div>
        );            
    }
}


const mapStateToProps = ({ user }) => {
    const {
        userRecentList,
    } = user;
    return {
        userRecentList,
    }
};

const mapDispatchToProps = { 
    getUserRecentList
 };

Recent = connect(mapStateToProps, mapDispatchToProps)(Recent)
export default Recent;
