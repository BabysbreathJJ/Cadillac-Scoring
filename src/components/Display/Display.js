/**
 * Created by Lijingjing on 17/2/24.
 */
import React, { Component } from 'react';
import Button from '../Button/Button';
import DisplayTable from '../DisplayTable/DisplayTable';
import '../EditTable/EditTable.css';
import '../Button/Button.css';
import './Display.css'
//import Add from '../Add/Add'
import Page from '../Page/Page';
import $ from 'jquery';
import {BaseUrl, SizePerPage} from '../Constants/constants';

import Loading from 'react-loading';
import loading from './loading.gif';
//import axios from 'axios';

class Display extends Component {
    constructor(props) {
        super(props);
        //this.onChange = this.onChange.bind(this);
        //this.edit = this.edit.bind(this);
        this.selectedItems = this.selectedItems.bind(this);
        this.goEdit = this.goEdit.bind(this);
        this.showAdd = this.showAdd.bind(this);
        this.changePage = this.changePage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        //this.uploadImage = this.uploadImage.bind(this);
        this.createExcel = this.createExcel.bind(this);
        this.goDownload = this.goDownload.bind(this);
        this.state = {
            showAdd: false,
            ths: ['序号', '模块', '区域', '分值', '评价项目', '评价标准', '标准照片'],
            items: [],
            selectedItems: {},
            pageno: 1,
            totalpage: 1,
            policy: {},
            isLoading: false,
            excelUrl : ''
        };
    }

    selectedItems(items) {
        this.setState({
            selectedItems: items
        });
        alert(JSON.stringify(items));
        for (var key in items) {
            console.log(key);
        }
    }

    goEdit() {
        this.props.router.push('/edit');
    }

    showAdd() {
        this.setState({
            showAdd: !this.state.showAdd
        });
    }

    changePage(i) {
        console.log("pageno: " + i);
        console.log("totalpage: " + this.state.totalpage);
        this.changePageRequest = $.get(BaseUrl + "questions/current/bypage", {
            size: SizePerPage,
            page: i
        }, function (response) {
            this.setState({
                pageno: i,
                items: response.data,
                selectedItems: {}
            });
        }.bind(this));
    }

    goDownload() {
        this.props.router.push('/download');
    }
    componentDidMount() {
        this.questionsRequest = $.get(BaseUrl + "questions/current/bypage", {
            size: SizePerPage,
            page: 1
        }, function (response) {
            //console.log(response);
            var totalpage = response.totalpages;
            this.setState({
                items: response.data,
                totalpage: totalpage
            });
        }.bind(this));
        //this.policyRequest = $.get("http://112.74.49.183:8080/POSMPlatform/file/policy", function (response, status) {
        //    // if(status === "success")
        //    //     alert("get policy success");
        //    this.setState({
        //        policy: response
        //    });
        //}.bind(this));
    }

    prevPage() {
        if (this.state.pageno === 1)
            return;
        this.prevPageRequest = $.get(BaseUrl + "questions/current/bypage", {
            size: SizePerPage,
            page: this.state.pageno - 1
        }, function (response) {
            var totalpage = response.totalpages;
            this.setState({
                items: response.data,
                totalpage: totalpage,
                pageno: this.state.pageno - 1
            });
        }.bind(this));
    }

    nextPage() {
        console.log("pageno: " + typeof  this.state.pageno);
        console.log("totalpage: " + typeof this.state.totalpage);
        if (this.state.pageno === this.state.totalpage)
            return;
        this.nextPageRequest = $.get(BaseUrl + "questions/current/bypage", {
            size: SizePerPage,
            page: this.state.pageno + 1
        }, function (response) {
            var totalpage = response.totalpages;
            this.setState({
                items: response.data,
                totalpage: totalpage,
                pageno: this.state.pageno + 1
            });
        }.bind(this));
    }


    createExcel(){
        this.setState({
            isLoading:true,
            excelUrl: ''
        })
        this.createExcelRequest = $.post(BaseUrl + "data/files")
        .done(function(data){
            console.log('data:' + data);
            if(data.success){
                this.setState({
                    excelUrl: data.url,
                    isLoading: false
                });
            }else{
                this.setState({
                    isLoading:false
                });
            }
            }.bind(this))
        .fail(function(){
            this.setState({
                isLoading:false
            });
        }.bind(this));
    }


    componentWillUnmount() {
        this.questionsRequest.abort();
        //this.changePageRequest.abort();
    }

    //uploadImage(file){
    //    var policy = this.state.policy;
    //    var data = new FormData();
    //    data.append("key", policy.dir + file.name);
    //    data.append("policy", policy.policy);
    //    data.append("OSSAccessKeyId", policy.accessid);
    //    data.append("success_action_status", 200);
    //    data.append("signature",policy.signature);
    //    data.append("file", file);
    //    $.ajax({
    //        url: policy.host,
    //        data: data,
    //        processData: false,
    //        cache: false,
    //        async: true,
    //        contentType: false,
    //        //关键是要设置contentType 为false，不然发出的请求头 没有boundary
    //        //该参数是让jQuery去判断contentType
    //        type: "POST",
    //        success: function (data, textStatus) {
    //            if (textStatus === "success") {
    //
    //                alert("success!");
    //            } else {
    //                alert("upload image failed");
    //            }
    //        }
    //    });
    //}
    render() {
        return (
            <div className="display-panel">
                {/*this.state.showAdd ? <Add uploadImage={this.uploadImage}/> : null*/}
                <div>
                    {/* <Button className="my-btn my-btn-green margin-left-0" icon="fa fa-trash fa-lg"/> */}
                    <Button className="my-btn my-btn-green" icon="fa fa-pencil-square-o fa-lg" onClick={this.goEdit}/>
                    <Button className="my-btn my-btn-green" icon="" name="图片压缩包下载" onClick={this.goDownload}/>
                    {/* <Button className="my-btn my-btn-green" icon="fa fa-external-link fa-lg" name="提交"/>
                     <Button className="my-btn my-btn-red float-right" icon="fa fa-pencil-square-o fa-lg" name="增加一题"
                     onClick={this.showAdd}/>*/}
                     <Button className="my-btn my-btn-red float-right" icon="" name="生成excel"
                            onClick={this.createExcel}/>
                    {this.state.isLoading ? <div className="loadingDiv"><img className='loadingImg' src={loading}/></div> : null}
                    {this.state.excelUrl!=='' ? <a href={BaseUrl + this.state.excelUrl} className="my-btn my-btn-red float-right">下载excel</a>:null}
                </div>
                <DisplayTable pageno={this.state.pageno} ths={this.state.ths} items={this.state.items} callbackParent={this.selectedItems}/>
                <Page pageno={this.state.pageno} changePage={this.changePage} prevPage={this.prevPage}
                      nextPage={this.nextPage}
                      totalpage={this.state.totalpage}/>
            </div>
        )

    }
}

Display.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Display;
//export default withRouter(Display);