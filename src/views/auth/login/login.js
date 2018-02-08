import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import Auth from '../../../modules/Auth';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    axios.post('http://localhost:3000/auth/login', {
      email: this.state.user.email,
      password: this.state.user.password
    }, {
      headers: {
      }
    }).then(res => {
      if (res.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // save the token
        Auth.authenticateUser(res.token);


        // change the current URL to /
        this.context.router.history.push('/');
      } else {
        // failure

        const errors = res.errors ? res.errors : {};
        errors.summary = res.message;

        this.setState({
          errors
        })
      }
    });
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form action="/" onSubmit={this.processForm}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-user"></i>
                          </span>
                        </div>
                        <Input type="text" name="email" placeholder="Email" onChange={this.changeUser} value={this.state.user.email}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-lock"></i>
                          </span>
                        </div>
                        <Input type="password" name="password" placeholder="Password" onChange={this.changeUser} value={this.state.user.password}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        {/* <Col xs="6">
                          <Button color="danger" className="px-4"><a href="http://localhost:3000/auth/google">Google</a></Button>
                        </Col> */}
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active ><Link to="/register">Register Now!</Link></Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Login;
