/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
import Button from '../Button/Button';
import EditTable from '../EditTable/EditTable';
import '../EditTable/EditTable.css';
import '../Button/Button.css';
import './Edit.css';
import Add from '../Add/Add'
import $ from 'jquery';
import Page from '../Page/Page';
import {BaseUrl, SizePerPage} from '../Constants/constants';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.getSelectedItems = this.getSelectedItems.bind(this);
        this.goDisplay = this.goDisplay.bind(this);
        this.showAdd = this.showAdd.bind(this);
        this.changePage = this.changePage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.updateQuestions = this.updateQuestions.bind(this);
        this.random_string = this.random_string.bind(this);
        this.get_suffix = this.get_suffix.bind(this);
        this.calculate_object_name = this.calculate_object_name.bind(this);
        this.deletePic = this.deletePic.bind(this);
        this.cacheItems = this.cacheItems.bind(this);
        this.deleteAddPic = this.deleteAddPic.bind(this);
        this.state = {
            showAdd: false,
            ths: ['序号', '模块', '区域', '分值', '评价项目', '评价标准', '标准照片'],
            items: [],
            selectedItems: {},
            pageno: 1,
            totalpage: 1,
            updateItems: [],
            policy: {},
            hasUpdated: false,
            picurl1: '',
            picurl2: '',
            picurl3: '',
            index: -1,//记录删除图片的临时索引,
            allModules:[],
            allRegions: {}
            //allRegions: []
        };
    }

    getSelectedItems(item, e) {


        var selectedItems = this.state.selectedItems;
        var submitResult = this.state.updateItems;


        var foundIndex = submitResult.findIndex(x=>x.id == e.target.id);

        if (e.target.checked) {
            selectedItems[e.target.id] = e.target.id;

            if (foundIndex == -1) {
                submitResult.push(item);
            } else {
                submitResult[foundIndex] = item;
            }

        }
        else {
            if (foundIndex !== -1) {
                submitResult.splice(foundIndex, 1);
                console.log(submitResult);
            }
            delete selectedItems[e.target.id];
        }
        this.setState({updateItems: submitResult, selectedItems: selectedItems});

        console.log(this.state.selectedItems);
        console.log(this.state.updateItems);

    }

    showAdd() {
        this.setState({
            showAdd: !this.state.showAdd
        });
    }

    goDisplay() {
        this.props.router.push('/display');
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
                items: this.cacheItems(response.data)
                //selectedItems: {}
            });
        }.bind(this));
    }

    componentDidMount() {
        this.questionsRequest = $.get(BaseUrl + "questions/current/bypage", {
            size: SizePerPage,
            page: 1
        }, function (response) {
            //console.log(response);
            var totalpage = response.totalpages;
            console.log("edit: ", response.data);
            this.setState({
                items: response.data,
                totalpage: totalpage
            });
        }.bind(this));

        this.policyRequest = $.get(BaseUrl + "file/policy", function (response, status) {
            // if(status === "success")
            //     alert("get policy success");
            this.setState({
                policy: response
            });
            console.log("policy");
            console.log(response);
        }.bind(this));

        $.get(BaseUrl + "modules/all", function (response, status) {
            var data = response.data;
            var regions = {};
            for(var i= 0; i < data.length; i++){
                var id = data[i].id;
                var region = data[i].regions;
                regions[id] = region;
            }
            console.log(regions);
            this.setState({
                allModules: data,
                allRegions: regions
            });
        }.bind(this));




    }


    cacheItems = function (items) {
        console.log(this.state.updateItems);
        console.log(items);
        for (var i = 0; i < items.length; i++) {
            let foundIndex = this.state.updateItems.findIndex(x=>x.id == items[i].id);
            if (foundIndex !== -1) {
                items[i] = this.state.updateItems[foundIndex];
            }
        }
        console.log(items);
        return items;
    };

    prevPage() {
        if (this.state.pageno === 1)
            return;
        this.prevPageRequest = $.get(BaseUrl + "questions/current/bypage", {
            size: SizePerPage,
            page: this.state.pageno - 1
        }, function (response) {
            var totalpage = response.totalpages;
            this.setState({
                items: this.cacheItems(response.data),
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
                items: this.cacheItems(response.data),
                totalpage: totalpage,
                pageno: this.state.pageno + 1
            });
        }.bind(this));
    }

    componentWillUnmount() {
        this.questionsRequest.abort();
        //this.changePageRequest.abort();
    }

    changeContent(type, index, value) {
        var items = this.state.items;
        var submitResult = this.state.updateItems;
        let foundIndex = submitResult.findIndex(x=>x.id == items[index].id);
        switch (type) {
            case 2:
                items[index].region.module.name = value;
                if (foundIndex == -1) {
                    submitResult.push(items[index]);
                } else {
                    submitResult[foundIndex].region.module.name = value;
                }
                break;
            case 3:
                items[index].region.name = value;
                if (foundIndex == -1) {
                    submitResult.push(items[index]);
                } else {
                    submitResult[foundIndex].region.name = value;
                }

                break;
            case 4:
                items[index].score = value;
                if (foundIndex == -1) {
                    submitResult.push(items[index]);
                } else {
                    submitResult[foundIndex].score = value;
                }
                break;
            case 5:
                items[index].item = value;
                if (foundIndex == -1) {
                    submitResult.push(items[index]);
                } else {
                    submitResult[foundIndex].item = value;
                }
                break;
            case 6:
                items[index].standard = value;

                if (foundIndex == -1) {
                    submitResult.push(items[index]);
                } else {
                    submitResult[foundIndex].standard = value;
                }
                break;
            case 7:
                var newUrl = items[index].picurl1;
                if (foundIndex == -1) {
                    submitResult.push(items[index]);
                } else {
                    submitResult[foundIndex].picurl1 = newUrl;
                }
                break;
            case 8:
                var newUrl = items[index].picurl2;
                if (foundIndex == -1) {
                    submitResult.push(items[index]);
                } else {
                    submitResult[foundIndex].picurl2 = newUrl;
                }
                break;
            case 8:
                var newUrl = items[index].picurl3;
                if (foundIndex == -1) {
                    submitResult.push(items[index]);
                } else {
                    submitResult[foundIndex].picurl3 = newUrl;
                }
                break;
        }


        this.setState({
            items: items,
            updateItems: submitResult
        });
    }

    addQuestion = function () {
        $.get(BaseUrl + "questions/current/bypage", {
            size: SizePerPage,
            page: 1
        }, function (response) {
            this.setState({
                pageno: 1,
                items: response.data,
                selectedItems: [],
                showAdd: false,
                totalpage: response.totalpages
            });
        }.bind(this));

    };


    random_string = function (len) {
        var len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
        var maxPos = chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    };

    get_suffix = function (filename) {
        var pos = filename.lastIndexOf('.');
        var suffix = '';
        if (pos != -1) {
            suffix = filename.substring(pos);
        }
        return suffix;
    };

    calculate_object_name = function (filename) {

        var policy = this.state.policy;
        var suffix = this.get_suffix(filename);
        var key = policy.dir;
        var g_object_name = key + this.random_string(10) + suffix;
        return g_object_name;

    };


    uploadImage(file, addr, index) {
        var policy = this.state.policy;
        var data = new FormData();
        var key = this.calculate_object_name(file.name);
        this.setState({
            index: index
        });

        //随机file.name

        data.append("key", key);
        data.append("policy", policy.policy);
        data.append("OSSAccessKeyId", policy.accessid);
        data.append("success_action_status", 200);
        data.append("signature", policy.signature);
        data.append("file", file);
        console.log(data.key);
        $.ajax({
            url: policy.host,
            data: data,
            processData: false,
            cache: false,
            async: true,
            contentType: false,
            //关键是要设置contentType 为false，不然发出的请求头 没有boundary
            //该参数是让jQuery去判断contentType
            type: "POST",
            success: function (data, textStatus) {
                if (textStatus === "success") {
                    console.log(textStatus);
                    //alert("success!");
                    var picurl = policy.host + '/' + key;
                    if (addr == 'picurl1') {
                        this.setState({picurl1: picurl});
                    } else if (addr == 'picurl2') {
                        this.setState({picurl2: picurl});
                    } else if (addr == 'picurl3') {
                        this.setState({picurl3: picurl});
                    }

                    console.log(this.state.index);
                    if (this.state.index != -1) {
                        let items = this.state.items;
                        items[index][addr] = picurl;
                        this.setState({items: items});
                    }


                } else {
                    alert("图片上传失败,请重新上传!");
                }
            }.bind(this),
            error: function () {
                alert("图片上传失败,请重新上传!");
            }
        });
    }

    deleteQuestion = function () {
        var selectedItems = this.state.selectedItems;
        var deleteIds = [];
        console.log(selectedItems);
        for (var key in selectedItems) {
            deleteIds.push({id: parseInt(key)});
        }
        //console.log(deleteIds);
        $.ajax({
            url: BaseUrl + 'questions',
            type: 'DELETE',
            data: JSON.stringify({data: deleteIds}),
            contentType: 'json',
            success: function (data) {
                alert("删除成功!");
                $.get(BaseUrl + "questions/current/bypage", {
                    size: SizePerPage,
                    page: 1
                }, function (response) {
                    this.setState({
                        pageno: 1,
                        items: response.data,
                        selectedItems: {},
                        totalpage: response.totalpages,
                        showAdd: false,
                        updateItems: []
                    });
                }.bind(this));
            }.bind(this)

        });
    };

    updateQuestions = function () {
        var updateItems = this.state.updateItems;
        console.log(updateItems);
        var myItems = [];
        for (var key in this.state.selectedItems) {
            let foundIndex = updateItems.findIndex(x=>x.id == key);
            myItems.push(updateItems[foundIndex]);
        }
        console.log(myItems);

        $.ajax({
            url: BaseUrl + 'questions',
            type: 'PATCH',
            data: JSON.stringify({data: updateItems}),
            contentType: 'json',
            success: function (data) {
                alert("提交成功!");
                this.setState({
                    pageno: 1,
                    selectedItems: {},
                    showAdd: false,
                    updateItems: []
                });
                this.props.router.push('/display');

            }.bind(this)

        });


    };

    deletePic = function (index, addr) {
        console.log(addr);
        var items = this.state.items;
        var submitResult = this.state.updateItems;
        let foundIndex = submitResult.findIndex(x=>x.id == items[index].id);

        var items = this.state.items;
        let updateItem = items[index];
        updateItem[addr] = null;

        if (foundIndex == -1) {
            submitResult.push(updateItem);
        }
        else {
            submitResult[foundIndex] = updateItem;
        }


        this.setState({
            items: items,
            updateItems: submitResult
        });
    };

    deleteAddPic = function (picurl) {
        if(picurl == 'picurl1'){
            this.setState({
                picurl1 : null
            });
        }else if(picurl == 'picurl2'){
            this.setState({
                picurl2 : null
            });
        }else if(picurl == 'picurl3'){
            this.setState({
                picurl3 : null
            });
        }
    };

    render() {
        return (
            <div className="display-panel">
                {this.state.showAdd ? <Add uploadImage={this.uploadImage} addQuestion={this.addQuestion}
                                           showAdd={this.showAdd}
                                           deletePic={this.deleteAddPic}
                                           picurl1={this.state.picurl1}
                                           picurl2={this.state.picurl2}
                                           picurl3={this.state.picurl3}
                /> : null}
                <div>
                    <Button className="my-btn my-btn-green margin-left-0" icon="fa fa-trash fa-lg"
                            onClick={this.deleteQuestion}/>
                    <Button className="my-btn my-btn-green" icon="fa fa-pencil-square-o fa-lg"/>
                    <Button className="my-btn my-btn-green" icon="fa fa-external-link fa-lg" name="提交"
                            onClick={this.updateQuestions}/>
                    <Button className="my-btn my-btn-red float-right" icon="fa fa-pencil-square-o fa-lg" name="增加一题"
                            onClick={this.showAdd}/>
                </div>
                <EditTable ths={this.state.ths} items={this.state.items} callbackParent={this.getSelectedItems}
                           uploadImage={this.uploadImage}
                           deletePic={this.deletePic}
                           allModules = {this.state.allModules}
                           allRegions = {this.state.allRegions}
                           pageno={this.state.pageno}
                           changeContent={this.changeContent}/>
                <Page pageno={this.state.pageno} changePage={this.changePage} prevPage={this.prevPage}
                      nextPage={this.nextPage}
                      totalpage={this.state.totalpage}/>
            </div>
        )

    }
}
export default Edit;
