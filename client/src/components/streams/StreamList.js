import React from "react";
import {connect} from 'react-redux';
import { fetchStreams } from "../../actions";
import {Link} from 'react-router-dom';

class StreramList extends React.Component{
    
    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdmin(stream){

        if(stream.userId === this.props.currentUserId){
            return(
                <div className="right floated content">
                    <Link to ={`/streams/edit/${stream.id}`} className="ui button primary "> edit </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                        delete
                    </Link>
                </div>
                )
        }

    }

    renderList(){
        return this.props.streams.map(stream=>{
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                        <div className="description">{stream.description}</div>
                    </div>
                    

                </div>
            )
        })
    }

    renderCreate(){

        if(this.props.isSignedIn){

            return(
                <div style={{textAlign:'right'}}>
                    <Link to="/streams/new" className="ui button primary">create stream</Link>
                </div>
            )
        }
    }

    render(){
        return <div>
            <h2>streams</h2>
            <div className="ui celled list">
                {this.renderList()}
            </div>
            {this.renderCreate()}
        </div>;
    }

    
}
const mapStateToProps=(state)=>{
        return {streams:Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn:state.auth.isSignedIn
    };
    }
export default connect(mapStateToProps,{fetchStreams })(StreramList);