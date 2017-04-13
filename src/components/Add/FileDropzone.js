/**
 * Created by sunbingyi on 2017/3/16.
 */
import React, {Component} from 'react';
import DefaultPic from '../Picture/DefaultPic';
import Dropzone from 'react-dropzone';
import '../Picture/Picture.css';
import Picture from '../Picture/Picture'

class FileDropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            choose: false
        };
        this.onDrop = this.onDrop.bind(this);
        this.deletePic = this.deletePic.bind(this);
    }

    onDrop(file) {
        console.log("file: ", file);
        this.setState({
            file: file,
            choose: true
        });
        console.log(file[0]);
        this.props.uploadImage(file[0], this.props.addr, this.props.index);

    }

    deletePic = function(){
        this.setState({
            file : null,
            choose: false
        });
        this.props.deletePic(this.props.addr);
    }


    render() {
        return (

            <div className="display-inline-block">
                {(this.state.choose) ? <Picture src={this.state.file[0].preview} edit="true"
                                                                  index={this.props.index}
                                                                  addr={this.props.addr}
                                                                  deletePic={this.deletePic}/> :
                    <Dropzone onDrop={this.onDrop} className="display-inline-block" multiple={false} accept="image/*">
                        <DefaultPic />
                    </Dropzone>
                }

            </div>

        );
    }
}

export default FileDropzone;

{

    /* <Dropzone onDrop={this.onDrop} className="display-inline-block" multiple={false}>
     {this.state.choose ? <Picture src={this.state.file[0].preview} edit="true"
     index={this.props.index}
     addr={this.props.addr}
     deltePic={this.props.deletePic}/> : (this.props.src ?
     <Picture src={this.props.src} edit="true" deletePic={this.props.deletePic} index={this.props.index}
     addr={this.props.addr}/> : <DefaultPic />)}

     </Dropzone>*/
}