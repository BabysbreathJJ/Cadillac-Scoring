/**
 * Created by sunbingyi on 2017/5/22.
 */
import React, { Component } from 'react';
import {BaseUrl} from '../Constants/constants';
import $ from 'jquery';
import './Download.css';
import Button from '../Button/Button';
import loading from '../Display/loading.gif';
class Download extends Component{
    constructor(props){
        super(props);
        this.state = {
            ths: ["大区", "小区", "经销商", "季度", "下载"],
            allZone: [],
            allSubzone: [],
            allDealer: [],
            allQuarter: [],
            zoneId: '',
            subzoneId: '',
            dealerId: '',
            quarter: '',
            isLoading: false,
            picUrl : ''

        };
        this.zoneChange = this.zoneChange.bind(this);
        this.subzoneChange = this.subzoneChange.bind(this);
        this.dealerChange = this.dealerChange.bind(this);
        this.quarterChange = this.quarterChange.bind(this);
        this.getPictureUrl = this.getPictureUrl.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    zoneChange(event){
        var zoneId = event.target.value;
        this.zoneIdChange(zoneId);
    }
    zoneIdChange(zoneId){
        $.ajax({
            url: BaseUrl + 'subzones/byzone?zone=' + zoneId,
            type: 'GET',
            headers:{
                'Authorization': window.localStorage.getItem('authorization')
            },
            success: function (response) {
                this.setState({
                    allSubzone: response.data,
                    zoneId: zoneId
                });
                this.subzoneIdChange(this.state.allSubzone[0].id);
            }.bind(this)
        });
    }

    subzoneChange(event){
        var subzoneId = event.target.value;
        this.subzoneIdChange(subzoneId);
    }
    subzoneIdChange(subzoneId){
        $.ajax({
            url: BaseUrl + 'dealer/bymac?mac=' + subzoneId,
            type: 'GET',
            headers:{
                'Authorization': window.localStorage.getItem('authorization')
            },
            success: function (response) {
                this.setState({
                    allDealer: response.data,
                    subzoneId: subzoneId
                });
                //console.log("daelerID" + this.state.dealerId);
                this.dealerIdChange(this.state.allDealer[0].id);
            }.bind(this)
        });
    }

    dealerChange(event){
        var dealerId = event.target.value;
        this.dealerIdChange(dealerId);
    }

    dealerIdChange(dealerId){
        $.ajax({
            url: BaseUrl + 'grade/quarterlist',
            type: 'GET',
            headers:{
                'Authorization': window.localStorage.getItem('authorization')
            },
            success: function (response) {
              //  var quarters = JSON.parse(response.data);
                this.setState({
                    allQuarter: response.data,
                    dealerId: dealerId
                });
                this.quarterStrChange(this.state.allQuarter[0].year + '.q' + this.state.allQuarter[0].quarter);
            }.bind(this)
        });
    }


    quarterChange(event){
        var quarterStr = event.target.value;
        this.quarterStrChange(quarterStr);
    }

    quarterStrChange(quarterStr){

        this.setState({
            quarter: quarterStr,
            picUrl: ''
        });

    }

    getPictureUrl(){
        var quarterArr = this.state.quarter.split(".q");
        this.setState({
            isLoading: true
        });
        //console.log(BaseUrl + 'data/images/' + this.state.dealerId + '/' + quarterArr[0] + '/' + quarterArr[1]);
        $.ajax({
            url: BaseUrl + 'data/images/' + this.state.dealerId + '/' + quarterArr[0] + '/' + quarterArr[1],
            type: 'POST',
            headers:{
                'Authorization': window.localStorage.getItem('authorization')
            },
            success: function (response) {
                //console.log(response);
                if(response.success) {
                    this.setState({
                        isLoading: false,
                        picUrl: response.url
                    });
                    alert('图片压缩包生成成功')
                }
                else{
                    this.setState({
                        isLoading: false
                    });
                    alert('所选经销商季度未打分')
                }
            }.bind(this),
            error: function () {
                alert('网络连接错误');
                this.setState({
                    isLoading: false
                })
            }.bind(this)
        });
    }

    goBack(){
        this.props.router.push('/display');
    }
    componentDidMount() {
        $.ajax({
            url: BaseUrl + 'zones',
            type: 'GET',
            crossDomain: true,
            headers: {
                'Authorization': window.localStorage.getItem('authorization')
            },
            success: function (response) {

                this.setState({
                    allZone: response.data,
                    zoneId: response.data[0].id
                });
                this.zoneIdChange(this.state.zoneId);
            }.bind(this)
        });


    }
    render(){
        return (
            <div className="display-download">
                <Button className="my-btn my-btn-green" icon="" name="返回" onClick={this.goBack}/>
            <table>
                <thead>
                    <tr>
                        {
                            this.state.ths.map((th, index)=>(
                                <th key={index}>{th}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td width="15%" style={{textAlign: 'center'}}>
                            <select onChange={this.zoneChange} value={this.state.zoneId}>
                                {
                                    this.state.allZone.map((zone, index)=>(
                                        <option key={index} value={zone.id}>{zone.name}</option>
                                    ))
                                }
                            </select>
                        </td>
                        <td width="15%" style={{textAlign: 'center'}}>
                            <select onChange={this.subzoneChange} value={this.state.subzoneId}>
                                {
                                    this.state.allSubzone.map((subzone, index)=>(
                                        <option key={index} value={subzone.id}>{subzone.name}</option>
                                    ))
                                }
                            </select>
                        </td>
                        <td width="15%" style={{textAlign: 'center'}}>
                            <select onChange={this.dealerChange} value={this.state.dealerId}>
                                {
                                    this.state.allDealer.map((dealer, index)=>(
                                        <option key={index} value={dealer.id}>{dealer.name}</option>
                                    ))
                                }
                            </select>
                        </td>
                        <td width="15%" style={{textAlign: 'center'}}>
                            <select onChange={this.quarterChange} value={this.state.quarter}>
                                {
                                    this.state.allQuarter.map((quarter, index)=>(
                                        <option key={index} value={quarter.year + '.q' + quarter.quarter}>{quarter.year + '.q' + quarter.quarter}</option>
                                    ))
                                }
                            </select>
                        </td>
                        <td>
                            <Button className="my-btn download-btn my-btn-green" icon="" name="生成图片压缩包" onClick={this.getPictureUrl}/>
                            {this.state.isLoading ? <div className="loadingDiv"><img className='loadingImg' src={loading}/></div> : null}
                            {this.state.picUrl!=='' ? <a href={BaseUrl + this.state.picUrl} className="my-btn download-btn my-btn-red float-right">下载图片压缩包</a>:null}
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}

export default Download;