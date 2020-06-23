import React, { Component } from 'react';
import Header from '../../components/header/index';
import MetaTags from 'react-meta-tags';
import { Container, Alert } from 'reactstrap';
import style from './projects.module.css';

class Projects extends Component {
  render() {
    return (
      <div>
        <MetaTags>
          <title>Projects</title>
          <meta name="projects" content="Project content"></meta>
          <meta name="keywords" content="projects, samuel davidson projects, web developer projects, portfolio projects, nerd developer projects"></meta>
        </MetaTags>
        <Header />
        <Container fluid>
          <h1>Projects</h1>
          <h2>Quiz App</h2>
          <Alert color="info">
            I chose to include the quiz application because it was my initial introduction into using a database and react together for a full-stack application. 
            <a href="https://github.com/ASL-WDD442/asl-quiz-app-SamSDavidson" className="alert-link">Repository</a>.
            My GitHub Repository for this project.
          </Alert>
          <h2>Advanced Serverside Languages Project</h2>
          <Alert color="success">
            Advanced Server-Side Langauges, or ASL, allowed me to take a further deep dive into using API's and how they interact with an active application.
            <a href="https://github.com/ASL-WDD442/asl-final-SamSDavidson/tree/master/web" className="alert-link">Repository</a>
            The ASL Repository
          </Alert>
          <h2>ShipIt</h2>
          <Alert color="danger">
          The ShipIt project introudced adding Redux and a backend to an existing front-end design. This further allowed me to understand redux as well as back-end systems. There was also an introduction into continuous integration and test-driven development.
            <a href="https://github.com/ePortfolios/wd6-project-2005-SamSDavidson/tree/stage" className="alert-link">Repository</a>.
            <a href="https://shipit-staged.herokuapp.com/" className="alert-link">ShipIt</a>
            The live version of ShipIt
          </Alert>
          <h2>Capstone</h2>
          <Alert color="warning">
          The Capstone was the true accumulation of my knowledge. This allowed me to devle into designing my own front end, using GitHub workflows as well as a matching back-end API and database. This combined all factors of the previous applications and was hosted on Heroku.
            <a href="https://github.com/fs-tech-degs/capstone-project-2003-SamSDavidson" className="alert-link">Repository</a>.
            <a href="https://storiesofanotherworld.herokuapp.com/">Stories of Another World</a>
            The live version of my Capstone Project
          </Alert>
        </Container>
      </div>
    )
  }
}

export default Projects;