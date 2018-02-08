import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Row, Col, Card, CardBody, CardText, CardFooter, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import Auth from '../../../modules/Auth';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
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
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);

    // create an AJAX request

    axios.post('http://localhost:3000/auth/register', {
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

        // set a message
        localStorage.setItem('successMessage', res.message);

        // make a redirect
        this.context.router.history.push('/login');
      } else {
        // failure

        const errors = res.errors ? res.errors : {};
        errors.summary = res.message;

        this.setState({
          errors
        });
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
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form action="/" onSubmit={this.processForm}>
                    <h1>Register!</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">@</span>
                      </div>
                      <Input type="text" name="email" placeholder="Email" onChange={this.changeUser} value={this.state.user.email}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-lock"></i>
                        </span>
                      </div>
                      <Input type="password" name="password" placeholder="Password" onChange={this.changeUser} value={this.state.user.password}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-lock"></i>
                        </span>
                      </div>
                      <Input type="password" placeholder="Repeat password"/>
                    </InputGroup>
                    <Button type="submit" color="success" block>Create Account</Button>
                  </Form>
                  <CardText>Already have an account? <Link to='/login'>Log in</Link></CardText>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Register.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Register;
