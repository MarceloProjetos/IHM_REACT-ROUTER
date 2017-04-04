import React, { Component } from 'react';

import { 
  Modal,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button,
  Tabs,
  Tab
} from 'react-bootstrap';

import md5 from 'md5';

import api from './../api';

import Error from './../Error';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      usuario: '',
      senha: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(element) {
    this.setState({[element.target.name]: element.target.value})
  }

  handleCloseDialog() {
    this.setState({dialog: null});
  }

  handleLogin() {
    api.usuario.login(this.state.usuario, md5(this.state.senha), this.handleAuthenticate.bind(this))
  }

  handleAuthenticate(user) {
    if (user.nome) {
      this.props.onLogin && this.props.onLogin(user);
    } else {
      let err = {mensagem: 'Usuário e senha não encontrado. Verifique se digitou a senha corretamente.'}
      this.setState({dialog: <Error {...err} onClose={this.handleCloseDialog.bind(this)} />})
    }
  }

  render() {

    return(
      <div className="static-modal">
        
          <Modal.Header>
            <Modal.Title>Qual a configuração desse dispositivo?</Modal.Title>
          </Modal.Header>

          <Modal.Body title="Selecione uma maquina">
          <Row>
            <Modal.Body>
              <Row>
                  <Col md={4}>Usuario</Col>
                  <Col md={8}>
                    <FormGroup validationState="success">
                      <FormControl type="text" name="usuario" value={this.state.usuario} onChange={this.handleChange} />
                      <FormControl.Feedback/>
                    </FormGroup>
                  </Col>
              </Row>
              <Row>
                  <Col md={4}>Senha</Col>
                  <Col md={8}>
                    <FormGroup validationState="success">
                      <FormControl type="password" name="senha" value={this.state.senha} onChange={this.handleChange} />
                      <FormControl.Feedback/>
                    </FormGroup>
                  </Col>
              </Row>
            </Modal.Body>
          </Row>
            
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleLogin} >Gravar</Button>
          </Modal.Footer>

          {this.state.dialog}
          
      </div>
    );
  }
}

        {/*<Grid>
          <Row>
            <Col  xs={12}   md={8} mdOffset={2} lg={8} lgOffset={2}> <Title title={'Maquina sem configuração!'} />      </Col>
            <Col  xsHidden  md={2}              lg={2}             >                                                    </Col>
          </Row>
          <Row>
            <Col  xs={2} xsOffset={5} md={2} mdOffset={5} lg={2} lgOffset={5}> <LoadingEllipse/>                        </Col>
            <Col  xs={5}    md={5}              lg={5}             >                                                    </Col>
          </Row>  
        </Grid>*/}