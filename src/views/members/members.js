import React, { Component } from 'react';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import axios from 'axios';

class Members extends Component {

  constructor(props) {
    super(props);
    this.state = { members: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/member/all', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      this.setState({ members: res.data });
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Members
              </CardHeader>
              <CardBody>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>English Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Date of Birth</th>
                      <th>Occupation</th>
                      <th>Organization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.members.map(member => <MemberItem key={member._id} member={member} />)}
                  </tbody>
                </Table>
                {/* <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next href="#">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

class MemberItem extends Component {
  render() {
    return (
      <tr key={this.props.member.id}>
        <td>{this.props.member.name.korean}</td>
        <td>{this.props.member.name.first} {this.props.member.name.last}</td>
        <td>{this.props.member.email}</td>
        <td>{this.props.member.phone}</td>
        <td>{this.props.member.birthday}</td>
        <td>{this.props.member.occupation}</td>
        <td>{this.props.member.organization}</td>
      </tr>
    );
  }
}
export default Members;
