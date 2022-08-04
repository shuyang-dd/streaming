import React from "react";
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions';

class GoogleAuth extends React.Component{


    componentDidMount(){
        window.gapi.load('client:auth:2',()=>{
            window.gapi.client.init({
                ////from google scope
                clientId:'cliendid',
                scope:'email'
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        }); 
    }

    onSignInClick=()=>{

        this.auth.signIn();
    }
    onSignOutClick=()=>{
         this.auth.signOut();
    }

    onAuthChange=(isSignedIn)=>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }
    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return null;
        }else if(this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick}  className="ui red google button">
                    <i className="google icon"/>
                    sign out
                </button>
            );
        }else{
            return (
                <button onClick={this.onSignInClick}  className="ui red google button">
                    <i className="google icon"/>
                    sign in with google
                </button>
            );
        }
    }
    render(){
        return <div>{this.renderAuthButton}</div>;
    }
}

const mapStateToPRops=(state)=>{
    return {isSignedIn:state.auth.isSignedIn};
}

export default connect(mapStateToPRops,{signIn,signOut})(GoogleAuth);