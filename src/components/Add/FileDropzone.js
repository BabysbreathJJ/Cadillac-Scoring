/**
 * Created by sunbingyi on 2017/3/16.
 */
import React, {Component} from 'react';
import DefaultPic from '../Picture/DefaultPic';
import Dropzone from 'react-dropzone';
import '../Picture/Picture.css';
import Picture from '../Picture/Picture'

class FileDropzone extends Component{
    constructor(props){
        super(props);
        this.state = {
            file : null,
            choose : false
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(file){
        console.log("file: " , file);
        this.setState({
            file : file,
            choose : true
        });
        console.log(file[0]);
        this.props.uploadImage(file[0]);

    }


    render(){
        return (
            <Dropzone onDrop={this.onDrop} className="display-inline-block" multiple={false}>
                {this.state.choose ? <Picture src={this.state.file[0].preview} /> : <DefaultPic />}
            </Dropzone>);
    }
}

export default FileDropzone;