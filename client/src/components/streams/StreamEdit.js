import React from "react";
import {fetchStream,editStream} from '../../actions';
import StreamForm from "./StreamForm";
import _ from 'lodash';
import history from "../../history";

class StreamEdit extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
        
    }

    onSubmit=(formValues)=>{
this.props.editStream(this.props.match.params.id,formValues);
history.pushState('/');
    }
    render(){
        if(!this.props.stream){

            return <div>loading</div>;
        }

        return <div>

            <h3>edit stream</h3>
            <StreamForm initialValues={_.pick(this.props.stream,'title','description')} onSubmit={this.onSubmit} />
        </div>;
};
}

const mapStateToProps=(state,ownProps)=>{
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{fetchStream,editStream})(StreamEdit);