/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
import Button from '../Button/Button';
import EditTable from '../EditTable/EditTable';
import '../EditTable/EditTable.css';
import '../Button/Button.css';
import './Edit.css'

class Edit extends Component {
    constructor(props) {
        super(props);
        //this.onChange = this.onChange.bind(this);
        //this.edit = this.edit.bind(this);
        this.getSelectedItems = this.getSelectedItems.bind(this);
        this.goDisplay = this.goDisplay.bind(this);
        this.state = {
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
            ],
            selectedItems: [],
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
            </div>
        )

    }
}
export default Edit;
