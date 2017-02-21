import React, { Component } from 'react';

import './App.css';

import { LoadingCircular } from './components';
//import mqtt from 'mqtt/lib/connect';

import api from './api';
import Login from './login';
//import Error from './Error';


import { 
  Col
} from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      config: null,
      
      usuario: null

    }

    this.handleLoadConfig = this.handleLoadConfig.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    api.maquina.config.get(this.handleLoadConfig.bind(this))
  }

  handleLoadConfig(config) {
    this.setState({config: config})
  }

  handleLogin(usuario) {
    this.setState({usuario: usuario}, this.props.router.push.bind(null, this.state.config.path))
  }

  render() {

    const main = ( 

      <Col md={12} >
        {this.props.children}
      </Col>

    )

    const login = (<Login onLogin={this.handleLogin} />);

    const load =(<LoadingCircular/>);

    return(
      <div className="App">
          {this.state.config ? (this.state.usuario ? main : login) : load}
      </div>
    )

  }

}
