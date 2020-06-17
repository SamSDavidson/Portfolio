import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Table, ListGroupItemHeading } from 'reactstrap';
import Header from '../../components/header/index';
import styles from './about.module.css';

class About extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>About Sam</h1>
        <Container fluid>
          <section>
            <h2>Who Am I?</h2>
            <p>
              Born in 1991 I am an avid technology fan.
              My major passions include figuring out how technology works, and doing a deep dive into new tools and technology such as computers, web browsers and mobile devices.
              This has translated into my educational and professional choices via my current occupation as a Internet Repair Specialist and degree in Website Design & Development at Full Sail University.
            </p>
          </section>
          <section>
            <h2>Skills</h2>
            <h3>Web Development</h3>
            <ListGroup horizontal>
              <ListGroupItem color="info">HTML</ListGroupItem>
              <ListGroupItem color="info">CSS</ListGroupItem>
              <ListGroupItem color="info">JavaScript</ListGroupItem>
              <ListGroupItem color="info">SQL</ListGroupItem>
              <ListGroupItem color="info">Node</ListGroupItem>
              <ListGroupItem color="info">Express</ListGroupItem>
            </ListGroup>
            <h3>Customer Service</h3>
            <ListGroup horizontal>
              <ListGroupItem color="info">Phone Based Support</ListGroupItem>
              <ListGroupItem color="info">Fraud Reports</ListGroupItem>
              <ListGroupItem color="info">Conflict De-escalation</ListGroupItem>
              <ListGroupItem color="info">Live In-Person Support</ListGroupItem>
              <ListGroupItem color="info">Express</ListGroupItem>
            </ListGroup>
            <h3>Office Skills</h3>

            <ListGroup horizontal>
              <ListGroupItem color="info">Microsoft Office</ListGroupItem>
              <ListGroupItem color="info">CRM</ListGroupItem>
              <ListGroupItem color="info">Records Maintenance</ListGroupItem>
              <ListGroupItem color="info">Help-Desk Technical Support</ListGroupItem>
            </ ListGroup>
          </section>
          <section>
            <h2>Education</h2>
            <Table bordered>
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>School</th>
                  <th>Degree</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">K-12</th>
                  <td>Horizon Charter School</td>
                  <td>General Studies</td>
                  <td>2010</td>
                </tr>
                <tr>
                  <th scope="row">University</th>
                  <td>Full Sail University</td>
                  <td>Web Design & Development</td>
                  <td>2020</td>
                </tr>
              </tbody>
            </Table>
          </section>
          <section>
            <h2>Work History</h2>
            <Table bordered>
              <thead>
                <tr>
                  <th>Years</th>
                  <th>Workplace</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">2019-Current</th>
                  <td>Spectum</td>
                  <td>Internet Repair Specialist</td>
                </tr>
                <tr>
                  <th scope="row">University</th>
                  <td>Full Sail University</td>
                  <td>Web Design & Development</td>
                  <td>2020</td>
                </tr>
              </tbody>
            </Table>
          </section>
        </Container>
      </div>
    )
  }
}

export default About;