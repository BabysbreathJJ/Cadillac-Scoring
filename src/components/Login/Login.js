/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
import $ from 'jquery';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(type,v){
        if(type == 1) {
            this.setState({
                username: v
            });
        }else if(type == 2) {
            this.setState({
                password: v
            });
        }
    }

    login() {
        var BaseUrl = "http://115.159.78.97:8080";
        var data = JSON.stringify({
            username : this.state.username,
            password : this.state.password
        });


        $.ajax({
            url: BaseUrl + '/CarPlatform/account/login',
            crossDomain:true,
            data:data,
            cache: false,
            async: true,
            type: "POST",
            contentType: 'application/json',
            success: function (data, textStatus) {
                if($.isEmptyObject(data)){
                    alert("用户名或密码错误");
                    return;
                }
                if(data.type != 3 && data.type !=6){
                    alert("当前账户没有访问权限!");
                    return;
                }
                window.localStorage.setItem("authorization", data.authorization);
                window.localStorage.setItem("type", data.type);
                this.props.router.push('/display');

            }.bind(this),
            error: function () {

            }.bind(this)
        });


    }


    render() {
        return (
            <div className="login-background">
                <div className="login">
                    <h2>凯迪拉克POSM打分系统</h2>
                    <input style={{display:'none'}}/>
                    <input value={this.state.username} type="text" className="form-control login-input" placeholder="请输入手机号/会员号/邮箱"
                           onChange={(event) => this.handleChange(1,event.target.value)}
                           autoComplete="off"/>
                    <input value={this.state.password} type="password" className="form-control login-input" placeholder="请输入密码" autoComplete="off"
                           onChange={(event) => this.handleChange(2,event.target.value)}
                    />
                    <button type="button" className="btn login-btn" onClick={this.login}>登录</button>
                </div>
            </div>
        );
    }
}

export default Login;
