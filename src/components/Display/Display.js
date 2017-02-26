/**
 * Created by Lijingjing on 17/2/24.
 */
import React, { Component } from 'react';
import Button from '../Button/Button';
import DisplayTable from '../DisplayTable/DisplayTable';
import '../EditTable/EditTable.css';
import '../Button/Button.css';
import './Display.css'
import Add from '../Add/Add'

class Display extends Component {
    constructor(props) {
        super(props);
        //this.onChange = this.onChange.bind(this);
        //this.edit = this.edit.bind(this);
        this.selectedItems = this.selectedItems.bind(this);
        this.goEdit = this.goEdit.bind(this);
        this.showAdd = this.showAdd.bind(this);
        this.state = {
            showAdd: false,
            ths: ['序号', '模块', '区域', '分值', '评价项目', '评价标准', '标准照片'],
            items: [{
                id: 1.1,
                module: '展厅',
                area: '单透',
                point: '2',
                evaluateItem: '左侧单透使用品牌',
                evaluateStandard: '1.左侧单透使用' + '\n' + '2.画面平整安装,这是一个很长的句子,这是一个很长的句子,这是一个很长的句子,是为了测试\n3.洽谈桌仅放置一个方形花环.,插白色百合,这是一个很长的句子,是为了测试',
                pictures: ['display.jpg', 'display.jpg', 'display.jpg']
            }, {

                id: 1.2,
                module: '展厅',
                area: '单透',
                point: '2',
                evaluateItem: '左侧单透使用品牌',
                evaluateStandard: '左侧单透使用',
                pictures: ['display.jpg', 'display.jpg']

            }
            ]
        };
    }

    selectedItems(items) {
        this.setState({
            selectedItems: items
        });
        alert(items);
    }

    goEdit() {
        this.props.router.push('/edit');
    }

    showAdd() {
        this.setState({
            showAdd: !this.state.showAdd
        });
    }

    render() {
        return (
            <div className="display-panel">
                {this.state.showAdd ? <Add/> : null}
                <div>
                    <Button className="btn btn-green margin-left-0" icon="fa fa-trash fa-lg"/>
                    <Button className="btn btn-green" icon="fa fa-pencil-square-o fa-lg" onClick={this.goEdit}/>
                    <Button className="btn btn-green" icon="fa fa-external-link fa-lg" name="提交"/>
                    <Button className="btn btn-red float-right" icon="fa fa-pencil-square-o fa-lg" name="增加一题"
                            onClick={this.showAdd}/>
                </div>
                <DisplayTable ths={this.state.ths} items={this.state.items} callbackParent={this.selectedItems}/>
            </div>
        )

    }
}

Display.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Display;
//export default withRouter(Display);