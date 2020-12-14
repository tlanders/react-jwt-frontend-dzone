import React from 'react';
import AuthenticationService from "../service/AuthenticationService";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    loginClicked() {
        console.log('login clicked');
        AuthenticationService.executeBasicAuth(this.state.username, this.state.password)
            .then(() => {
                console.log('registering login success')
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.props.history.push('/courses')
            })
            .catch(err => {
                console.log('login err: ' + err);
                this.setState({
                    hasLoginFailed: true,
                    showSuccessMessage: false,
                });
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render() {
        return (
            <>
                <h1>Login</h1>
                <div className={'container'}>
                    {this.state.hasLoginFailed && <div className={'alert alert-warning'}>Invalid Credentials</div> }
                    {this.state.showSuccessMessage && <div className={'alert alert-succcess'}>Login Successful</div> }
                    User Name: <input type={'text'} name={'username'} value={this.state.username} onChange={this.handleChange}/><br/>
                    Password: <input type={'password'} name={'password'} value={this.state.password} onChange={this.handleChange}/><br/>
                    <button className={'btn btn-success'} onClick={this.loginClicked}>Login</button>
                </div>
            </>
        );
    }
}

export default LoginComponent;