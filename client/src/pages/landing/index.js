import styles from './landing.module.css';
import { Container, Card, CardBody, CardTitle, Button, CardHeader, CardFooter, CardText } from 'reactstrap'
import React, { Component } from 'react';
import {FaIdCard} from 'react-icons/fa'
import {FaBook} from 'react-icons/fa'
import {FaCode} from 'react-icons/fa'
import {Link} from 'react-router-dom'

class Landing extends Component {
  render() {
    return (
      <div>
        <Container className={styles.content}>
          <h1>Sam Davidson</h1>
          <h2>Welcome to My Portfolio</h2>
          <Container className={styles.pageCards}>
            <Card body inverse color="success">
              <CardTitle>About</CardTitle>
              <a href="/about"><FaIdCard size="5rem" color="white"/></a>
            </Card>
            <Card body inverse color="info">
              <CardTitle>Projects</CardTitle>
              <a href="/projects"><FaCode size="5rem" color="white"/></a>
            </Card>
            <Card body inverse color="warning">
              <CardTitle>Blog</CardTitle>
              <a href="/blog"><FaBook size="5rem" color="white"/></a>
            </Card>
          </Container>

        </Container>
      </div>
    )
  }
}

export default Landing;
