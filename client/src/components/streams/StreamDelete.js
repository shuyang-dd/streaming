import React from "react";
import Modal from "../Modal";
import history from '../../history';
import { fetchStream,deleteStream } from "../../actions";
import {Link} from 'react-router-dom';


class StreamDelete extends React.Component{

    componentDidMount(){

        this.props.fetchStream(this.props.match.params.id);
    }
    renderActions(){
      return(
        <>
            <button onClick={()=>this.props.deleteStream(this.props.match.params.id)} className="ui button negative">delete</button>
            <Link to="/" className="ui button ">cancel</Link>
        </>
    );  
    }

    renderContent(){
        if(!this.props.stream){
            return 'delete?'
        }

        return `delete ${this.props.stream.title}?`
    }
    

    render(){ 

        <Modal title="delete stream"  
        content={this.renderContent()} 
        actions={this.renderActions()} 
        onDismiss={()=>history.push('/')}
        />
 
    };
}

const mapStateToProps=(state,ownProps)=>{
 return {stream:state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete);