import React, {Component} from 'react';
import propTypes from 'prop-types';
import {ajax} from '../api';
import Button from './Button';

import logo from '../images/logo.png';
import success from '../images/success.png';

class Form extends Component{
    constructor(){
        super();
        this.state = {
          loading: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();

        this.setState(() => {
           return{
               loading: true
           }
        });

        let login = this.refs.login.value,
            password = this.refs.password.value;
        this.props.onSubmit(login, password);
    }

    render(){
        return(
            <section className="container text-center">
                <div className="logo">
                    <img src={logo} alt="Logo"/> <span>Login</span>
                </div>
                <form className="form-horizontal text-center">
                    <fieldset>
                        <div className="form-group">
                            <label>
                                <input
                                    className={this.props.logged === null ? "form-control" : "failed form-control"}
                                    type="text"
                                    placeholder="Login"
                                    ref="login"
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Password"
                                    ref="password"
                                />
                            </label>
                        </div>
                        <div className="form-group">
                           <Button loading={this.props.loading} onClick={this.handleClick}/>
                        </div>
                    </fieldset>
                </form>
            </section>
        )
    }
}
Form.propTypes = {
    loading: propTypes.bool.isRequired,
    logged: propTypes.bool,
    onSubmit: propTypes.func.isRequired
};

class App extends Component{
    constructor(){
        super();
        this.state = {
          logged: null,
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(login, password){
        let url = `http://${window.location.host}/login`;

        this.setState({loading: true});

        ajax(url, 'POST', {login, password}).then((res) => {
            let auth = JSON.parse(res).auth;
            setTimeout(() => {
                if(auth === 'Logged')
                    this.setState(() => {
                        return {
                            logged: true,
                            loading: false
                        }
                    });
                if(auth === 'Denied')
                    this.setState(() => {
                        return {
                            logged: false,
                            loading: false
                        }
                    });
            }, 1000);
        });
    }

    render(){
        return(
            <div>
                {this.state.logged === true && <h1 className="text-center success"><img src={success} alt=""/>Succesful logged</h1>}
                {this.state.logged !== true && <Form loading={this.state.loading} logged={this.state.logged} onSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}

export default App;