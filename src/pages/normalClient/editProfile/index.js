import React, {Component} from 'react';

// redux
import { connect } from 'react-redux';
import { updateUserProfile, getUserProfile } from '../../../redux/actions';

// components
import AvatarImageCropper from 'react-avatar-image-cropper';
import swal from 'sweetalert';
import Header1 from '../../../components/Header1';

// images
import avatarImg from '../../../assets/images/avatar.jpg';
import icon_upload from '../../../assets/images/icon_upload.png';
import icon_chk_ept from '../../../assets/images/icon_chk_ept.png';
import icon_chk_fill from '../../../assets/images/icon_chk_fill.png';

class EditProfile extends Component { 

    constructor(props){
        super(props)
        this.state = {
            image: 'your-image-url or as base64',
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 4 / 3,

            file: null,
            baseFile: null,
            curFile: null,
            uploadPanel: false,
            user_first: '',
            user_last: '',
            user_email: '',
            user_chg_pw: false,
            user_cur_pw: '',
            user_new_pw: '',
            user_cfm_pw: '',
        }
    }

    componentDidMount = async() => {
        const { clientInfo } = this.props;
        await this.setState({
            file: clientInfo.avatar !== undefined ? clientInfo.avatar : null,
            curFile: clientInfo.avatar !== undefined ? clientInfo.avatar : null,
            user_first: clientInfo.firstname,
            user_last: clientInfo.lastname,
            user_email: clientInfo.email,
        });
    }

    updateUserProfile = () => {

        let { baseFile, curFile, user_first, user_last, user_email, user_chg_pw, user_cur_pw, user_new_pw, user_cfm_pw } = this.state;

        if ( user_first === '' ) {
            swal("Please input First name.");
            return;
        }

        if ( user_last === '' ) {
            swal("Please input Last name.");
            return;
        }

        if ( user_email === '' ) {
            swal("Please input Email address.");
            return;
        }

        if (user_chg_pw) {
            if ( user_cur_pw === '' ) {
                swal("Please input Your current password.");
                return;
            }

            if ( user_new_pw === '' ) {
                swal("Please input New password.");
                return;
            }

            if ( user_cfm_pw === '' ) {
                swal("Please input Password.");
                return;
            }

            if ( user_new_pw !== user_cfm_pw ) {
                swal("Confirm Password is not match.");
                return;
            }

            if (user_cur_pw === user_new_pw) {
                swal("Please input other new password.");
                return;
            }
        }

        let data = JSON.stringify({
            "ChangePassword": user_chg_pw,
            "CurrentPassword": user_cur_pw,
            "NewPassword": user_new_pw,
            "Firstname": user_first,
            "Lastname": user_last,
            "Email": user_email,
            "Avatar": baseFile === null ? curFile : baseFile,
        });

        this.props.updateUserProfile(data, () => this.props.getUserProfile('', () => this.props.history.push('/dashboard')));
    }
    
    setOnlyNum = (e, str) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ [str]: onlyNums });
    }
    
    apply = (file) => {
        let src = window.URL.createObjectURL(file);

        this.encodeImageFileAsURL(file);

        this.setState({file: src, uploadPanel: false,});
    }

    onCancelIMG = () => {
        this.setState({uploadPanel: false,});
    }

    encodeImageFileAsURL = async(file) => {
        let _this = this;
        let reader = new FileReader();
        reader.onloadend = await function() {
        //   document.write('RESULT: ', reader.result);
          _this.setState({baseFile: reader.result});
        }
        reader.readAsDataURL(file);
    }

    onDeleteImg = () => {
        // const { file, baseFile, curFile } = this.state;
        // if (curFile === null && file === null && baseFile === null) return;
        // if (file)
        this.setState({file: null, baseFile: null});
    }

    onCheckState = () => {
        const { baseFile, user_first, user_last, user_email, user_chg_pw } = this.state;
        const { clientInfo } = this.props;
        
        if (
                clientInfo.firstname === undefined ||
                (clientInfo.firstname === user_first &&
                clientInfo.lastname === user_last &&
                clientInfo.email === user_email &&
                user_chg_pw === false &&
                baseFile === null)
            )
            return true;
        
        return false;
    }

    render() { 

        const { file, uploadPanel, user_first, user_last, user_email, user_chg_pw, user_cur_pw, user_new_pw, user_cfm_pw } = this.state;
 
        let disable = this.onCheckState();

        return (             
            <div >
                <Header1 {...this.props}/>
                
                <div className="set-container w-m">
                    <p className="title-main"> Edit profile </p>
                    <p className="title-sub">
                        Manage your personal information here.
                    </p>

                    <div className="divider"></div> 


                    <div className="set-input">

                        <div className="file-input">

                            <img className="photo" src={!file ? avatarImg : file} alt='myphoto' />
                            <div className="btn-group">
                                <button className="active" onClick={() => this.setState({uploadPanel: true})}> <img src={icon_upload} alt='myphoto'/>Upload photo </button>
                                <button onClick={this.onDeleteImg}> Delete current photo </button>
                            </div>
                            {
                                uploadPanel &&                            
                                <div style={{position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, zIndex: 10001, textAlign: 'center', margin: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                                    <div style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, zIndex: 10001, textAlign: 'center', margin: 'auto', width: '350px', height: '350px', border: '1px solid black', background: `url(${!file ? avatarImg : file}) center center no-repeat`, backgroundSize: 'cover' }}>
                                        <AvatarImageCropper isBack={false} apply={this.apply} cancel={this.onCancelIMG} image={this.state.file} maxsize={1024 * 1024 *5} />
                                    </div>
                                </div>
                            }

                        </div>
                        <div className="set-multi">
                            <fieldset className="double">
                                <p className="title-input">First name</p>
                                <input type="text" placeholder="" value={user_first} onChange={(e) => this.setState({user_first: e.target.value}) } />
                            </fieldset>
                            
                            <fieldset className="double">
                                <p className="title-input">Last name</p>
                                <input type="text" placeholder="" value={user_last} onChange={(e) => this.setState({user_last: e.target.value}) } />
                            </fieldset>
                        </div>
                    
                        <fieldset >
                            <p className="title-input">Email address</p>
                            <input type="text" placeholder="" value={user_email} onChange={(e) => this.setState({user_email: e.target.value}) } />
                        </fieldset>


                        <fieldset>
                            <div className="option">
                                <img src={user_chg_pw ? icon_chk_fill : icon_chk_ept} alt="icon" onClick={() => this.setState({user_chg_pw: !user_chg_pw})}/>
                                <span className={user_chg_pw?'active':''}> Change password </span>
                            </div>
                        </fieldset>

                        <div className="set-multi" disabled={!user_chg_pw}>
                            <fieldset className="double">
                                <p className="title-input"> Your current password </p>
                                <input type="password" placeholder="" value={user_cur_pw} onChange={(e) => this.setState({user_cur_pw: e.target.value}) } />
                            </fieldset>
                        </div>

                        <div className="set-multi"  disabled={!user_chg_pw}>
                            <fieldset className="double">
                                <p className="title-input"> Your new password </p>
                                <input type="password" placeholder="" value={user_new_pw} onChange={(e) => this.setState({user_new_pw: e.target.value}) } />
                            </fieldset>
                            
                            <fieldset className="double">
                                <p className="title-input"> Repeat new password </p>
                                <input type="password" placeholder="" value={user_cfm_pw} onChange={(e) => this.setState({user_cfm_pw: e.target.value}) } />
                            </fieldset>
                        </div>
                        
                    </div>

                    <button className="btn-bottom btn_apply" disabled={disable} onClick={this.updateUserProfile}> Save changes </button>

                </div>
            </div>
            
        );            
    }
}


const mapStateToProps = ({ auth }) => {

    const {
        clientInfo,
    } = auth;
    return {
        clientInfo,
    }
};

const mapDispatchToProps = { 
    updateUserProfile,
    getUserProfile
};

EditProfile = connect(mapStateToProps, mapDispatchToProps)(EditProfile)
export default EditProfile;
