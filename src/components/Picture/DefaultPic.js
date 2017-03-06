/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './Picture.css';

class DefaultPic extends Component {

    //constructor(props){
    //    var uploader = new plupload.Uploader({
    //        browse_button: 'browse', // this can be an id of a DOM element or the DOM element itself
    //        url: 'http://10.0.0.7:8080/POSMPlatform/file/policy'
    //    });
    //
    //    uploader.init();
    //    this.state={
    //        untimes : 'html5,flash,silverlight,html4',
    //        uploader: uploader,
    //        flash_swf_url : {process.env.PUBLIC_URL+'/plupload//Moxie.swf'},
    //        silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
    //        url : 'http://oss.aliyuncs.com',
    //    };
    //}


    render() {
        return (
            <div className="display-inline-block" id="browse">
                <div className="display-inline-block pic-default"><i className="fa fa-camera fa-lg icon-center"></i></div>
            </div>
        );
    }
}

export default DefaultPic;