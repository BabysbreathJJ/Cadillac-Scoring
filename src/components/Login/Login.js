/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            account: '',
            password: ''
        }
    }

    login() {
        this.props.router.push('/display');
    }


    render() {
        return (
            <div className="login-background">
                <div className="login">
                    <h2>凯迪拉克高库龄车辆交易平台</h2>
                    <input style={{display:'none'}}/>
                    <input type="text" className="form-control login-input" placeholder="请输入手机号/会员号/邮箱"
                           autoComplete="off"/>
                    <input type="password" className="form-control login-input" placeholder="请输入密码" autoComplete="off"/>
                    <button type="button" className="btn login-btn" onClick={this.login}>登录</button>
                </div>
            </div>
        );
    }
}

export default Login;
