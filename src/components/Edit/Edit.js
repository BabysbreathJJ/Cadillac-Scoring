/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
import Button from '../Button/Button';
import EditTable from '../EditTable/EditTable';
import '../EditTable/EditTable.css';
import '../Button/Button.css';
import './Edit.css';
import $ from 'jquery';
import Page from '../Page/Page';
import {BaseUrl, SizePerPage} from '../Constants/constants';

class Edit extends Component {
    constructor(props) {
        super(props);
        //this.onChange = this.onChange.bind(this);
        //this.edit = this.edit.bind(this);
        this.getSelectedItems = this.getSelectedItems.bind(this);
        this.goDisplay = this.goDisplay.bind(this);
        this.changePage = this.changePage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.state = {
            ths: ['序号', '模块', '区域', '分值', '评价项目', '评价标准', '标准照片'],
            items: [],
            selectedItems: {},
            pageno: 1,
            totalpage: 1,
            updateItems: []
        };
    }

    getSelectedItems(result) {
        this.setState({
            selectedItems: result.selectedItems,
            updateItems: result.submitResult
        });
        console.log(result);
        console.log(result.submitResult);
        console.log(result.submitResult[result.selectedItems[0]]);

    }

    goDisplay() {
        this.props.router.push('/display');
    }
    changePage(i){
        console.log("pageno: " +  i);
        console.log("totalpage: " + this.state.totalpage);
        this.changePageRequest = $.get(BaseUrl + "questions/current/bypage", {size: SizePerPage, page: i}, function (response) {
            this.setState({
                pageno: i,
                items: response.data,
                selectedItems: []
            });
        }.bind(this));
    }
    componentDidMount(){
        this.questionsRequest = $.get(BaseUrl + "questions/current/bypage", {size: SizePerPage, page:1}, function (response) {
            //console.log(response);
            var totalpage = response.totalpages;
            this.setState({
                items: response.data,
                totalpage: totalpage
            });
        }.bind(this));
    }

    prevPage(){
        if(this.state.pageno === 1)
            return;
        this.prevPageRequest = $.get(BaseUrl + "questions/current/bypage", {size: SizePerPage, page: this.state.pageno - 1}, function (response) {
            var totalpage = response.totalpages;
            this.setState({
                items: response.data,
                totalpage: totalpage,
                pageno: this.state.pageno - 1
            });
        }.bind(this));
    }

    nextPage(){
        console.log("pageno: " + typeof  this.state.pageno);
        console.log("totalpage: " + typeof this.state.totalpage);
        if(this.state.pageno === this.state.totalpage)
            return;
        this.nextPageRequest = $.get(BaseUrl + "questions/current/bypage", {size: SizePerPage, page: this.state.pageno + 1}, function (response) {
            var totalpage = response.totalpages;
            this.setState({
                items: response.data,
                totalpage: totalpage,
                pageno: this.state.pageno + 1
            });
        }.bind(this));
    }
    componentWillUnmount(){
        this.questionsRequest.abort();
        this.changePageRequest.abort();
    }

    render() {
        return (
            <div className="display-panel">
                <div>
                    <Button className="btn btn-green margin-left-0" icon="fa fa-trash fa-lg"/>
                    <Button className="btn btn-green" icon="fa fa-pencil-square-o fa-lg"/>
                    <Button className="btn btn-green" icon="fa fa-external-link fa-lg" name="提交"
                            onClick={this.goDisplay}/>
                    <Button className="btn btn-red float-right" icon="fa fa-pencil-square-o fa-lg" name="增加一题"/>
                </div>
                <EditTable ths={this.state.ths} items={this.state.items} callbackParent={this.getSelectedItems}/>
                <Page pageno={this.state.pageno} changePage={this.changePage} prevPage={this.prevPage} nextPage={this.nextPage}
                      totalpage={this.state.totalpage}/>
            </div>
        )

    }
}
export default Edit;
