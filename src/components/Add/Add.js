/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
import './Add.css';
import DefaultPic from '../Picture/DefaultPic'
import '../Button/Button.css';
import Button from '../Button/Button';
import Dropzone from 'react-dropzone';
import FileDropzone from './FileDropzone';
import Modal from '../Modal/Modal';
import $ from 'jquery';
import {BaseUrl} from '../Constants/constants';
class Add extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.setModule = this.setModule.bind(this);
        this.addItem = this.addItem.bind(this);
        this.editModule = this.editModule.bind(this);
        this.add = this.add.bind(this);
        this.saveItems = this.saveItems.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            modalId: '',
            modalTitle: '',
            module: '',
            moduleId: '',
            region: '',
            regionId: '',
            showModal: false,
            items: [],
            edit: false,
            newItems: [],
            changedItems: []
        }
    }

    showModal = function (e) {
        //console.log(e.target.getAttribute('name'));
        let addPanel = document.getElementById("addPanel");
        //addPanel.style.zIndex = '1';
        var modalTitle = e.target.getAttribute('name');
        let requestUrl = "";
        if (modalTitle == '模块') {
            requestUrl = 'modules/all';
        } else if (modalTitle == '区域') {
            if (this.state.moduleId == '') {
                alert("请先选择模块!");
                return;
            }
            requestUrl = 'regions/bymodule/all?module=' + this.state.moduleId;
        }

        $.get(BaseUrl + requestUrl, function (response) {
            this.setState({
                items: response.data,
                showModal: true,
                modalTitle: modalTitle
            });
        }.bind(this));
    };

    handleCloseModal = function () {
        let addPanel = document.getElementById("addPanel");
        this.setState({showModal: false, edit: false});
    };

    setModule = function (modalTitle, id, name) {

        if (modalTitle == '模块') {
            this.setState({
                moduleId: id,
                showModal: false,
                module: name
            });
        }
        else {
            this.setState({
                regionId: id,
                showModal: false,
                region: name
            });
        }


    };

    addItem = function () {
        let tempScore = document.getElementById('score').value;
        let score = parseFloat(tempScore);
        if (isNaN(score)) {
            alert("分值部分请填写数字!");
            return;
        } else if (this.state.regionId == '') {
            alert("区域和模块是必选项!");
            return false;
        } else {
            let data = {};
            data.item = document.getElementById('item').value;
            data.score = score;
            data.standard = document.getElementById('standard').value;
            data.region = {};
            data.region.id = this.state.regionId;
            data.picurl1 = this.props.picurl1;
            data.picurl2 = this.props.picurl2;
            data.picurl3 = this.props.picurl3;
            let addItem = {data: data};
            $.ajax({
                url: BaseUrl + 'questions',
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(addItem)
            }).done(function (data) {
                this.props.addQuestion();
            }.bind(this));


        }


    };

    editModule = function () {
        console.log("edit");
        this.setState({
            edit: true
        });
    };

    add = function () {
        var items = this.state.items;
        var item;
        var modalTitle = this.state.modalTitle;
        var moduleId = this.state.moduleId;
        if (modalTitle == '模块') {
            item = {name: ''};
            items.push(item);
        } else {
            item = {name: '', module: {id: moduleId}};
            items.push(item);
        }


        this.setState({
            items: items
        });
        console.log(this.state.items);
    };

    saveItems = function () {
        var data = {data: this.state.items};
        var requestUrl = '';
        var modalTitle = this.state.modalTitle;
        var changedItems = this.state.changedItems;
        var newItems = this.state.newItems;
        var items = this.state.items;
        var myUrl = "";

        if (modalTitle == '模块') {
            requestUrl = 'modules/';
            myUrl = 'modules/all';
        } else if (modalTitle == '区域') {
            requestUrl = 'regions/';
            myUrl = 'regions/bymodule/all?module=' + this.state.moduleId;
            if (this.state.moduleId == '') {
                alert("请先选择模块!");
                return;
            }
        }


        $.ajax({
            url: BaseUrl + requestUrl,
            method: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({data: newItems})
        }).done(function (data) {
            $.ajax({
                url: BaseUrl + requestUrl,
                method: "PATCH",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({data: changedItems})
            }).done(function (data) {

                $.get(BaseUrl + myUrl, function (response) {
                    this.setState({
                        items: response.data,
                        showModal: true,
                        modalTitle: modalTitle,
                        edit: false,
                        newItems: [],
                        changedItems: []
                    });
                }.bind(this));

            }.bind(this));

        }.bind(this));
        //console.log(changedItems);
        //console.log(newItems);


    };

    changeItem = function (index, value, id) {
        var items = this.state.items;

        var oldValue = items[index].name;
        items[index].name = value;
        var newItems = this.state.newItems;
        var changedItems = this.state.changedItems;
        var moduleId = this.state.moduleId;
        var modalTitle = this.state.modalTitle;
        if (id == undefined) {
            var newIndex = -1;
            for (var i = 0; i < newItems.length; i++) {
                console.log(i + newItems[i].name);
                console.log(i + name);

                if (newItems[i].name == oldValue) {
                    newIndex = i;
                    break;
                }

            }
            if (newIndex !== -1) {
                newItems[newIndex].name = value;
            } else {
                if (modalTitle == '模块') {

                    newItems.push({name: value});
                } else {
                    newItems.push({name: value, module: {id: moduleId}});
                }
            }

            this.setState({
                items: items,
                newItems: newItems
            });
        } else {
            console.log(changedItems);
            console.log(oldValue);
            let changedIndex = changedItems.findIndex(x=>x.id == id);
            console.log(changedIndex);
            if (changedIndex !== -1) {
                changedItems[changedIndex].name = value;
            } else {
                changedItems.push(items[index]);
            }

            this.setState({
                items: items,
                changedItems: changedItems
            });
        }

    };

    deleteItem = function (id, index) {
        var newItems = this.state.newItems;
        console.log(newItems);
        var changedItems = this.state.changedItems;
        var items = this.state.items;
        var item = items[index];
        var requestUrl = "";

        var modalTitle = this.state.modalTitle;
        if (modalTitle == '模块') {
            requestUrl = 'modules/';

        } else if (modalTitle == '区域') {
            requestUrl = 'regions/';
        }


        if (id == undefined) {
            var indexOfNew = newItems.findIndex(x=>x.name == item.name);
            newItems.splice(indexOfNew, 1);
            items.splice(index, 1);
            this.setState({
                items: items,
                newItems: newItems
            });

        } else {

            $.ajax({
                url: BaseUrl + requestUrl + id,
                method: "DELETE",
                dataType: 'json'
            }).done(function (data) {
                var indexOfChanged = changedItems.findIndex(x=>x.name == item.name);
                changedItems.splice(indexOfChanged, 1);
                var items = this.state.items;
                items.splice(index, 1);
                this.setState({
                    items: items,
                    changedItems: changedItems
                });
            }.bind(this));

        }


    };

    render() {
        return (
            <div>
                <div className="add-panel" id="addPanel">
                    <div>
                        <input type="text" className="display-none" style={{width:'58px'}}/>
                        <input type="text" data-toggle="modal" name="模块" value={this.state.module} readOnly
                               data-target="#myModuleModal" onClick={this.showModal}/>
                        <input type="text" name="区域" onClick={this.showModal} value={this.state.region} id="region"
                               readOnly/>
                        <input type="text" name="分值" id="score"/>
                        <input type="text" name="评价项目" id="item" style={{width:'13.7%'}}/>
                        <textarea name="评价标准" id="standard"/>
                        <div className="display-inline-block margin-pics">
                            <FileDropzone uploadImage={this.props.uploadImage} addr="picurl1" index="-1"
                                          deletePic={this.props.deletePic}/>
                            <FileDropzone uploadImage={this.props.uploadImage} addr="picurl2" index="-1"
                                          deletePic={this.props.deletePic}/>
                            <FileDropzone uploadImage={this.props.uploadImage} addr="picurl3" index="-1"
                                          deletePic={this.props.deletePic}/>
                        </div>
                    </div>


                    <div className="display-right margin-right-10 margin-top-10">
                        { /* <Button className="my-btn my-btn-green margin-left-0" icon="fa fa-plus fa-lg"/>*/ }
                        <Button className="my-btn my-btn-green" icon="fa fa-download fa-lg" name="保存"
                                onClick={this.addItem}/>
                        <Button className="my-btn my-btn-red" icon="fa fa-close fa-lg" name="取消"
                                onClick={this.props.showAdd}/>
                    </div>
                </div>
                <Modal
                    showModal={this.state.showModal} modalTitle={this.state.modalTitle}
                    editModule={this.editModule}
                    add={this.add}
                    saveItems={this.saveItems}
                    handleCloseModal={this.handleCloseModal}
                    edit={this.state.edit}
                    items={this.state.items}
                    changeItem={this.changeItem}
                    deleteItem={this.deleteItem}
                    setModule={this.setModule}

                />

            </div>
        );
    }

}

export default Add;