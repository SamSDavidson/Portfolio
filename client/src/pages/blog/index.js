import React, { Component } from 'react';
import Header from '../../components/header/index';
import { MetaTags } from 'react-meta-tags';
import Post from '../../components/post/index';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';
import Container from './container';

class Blog extends Component {
  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  render() {
    const posts = this.props;
    return (
      <div>
        <MetaTags>
          <title>Blog</title>
          <meta name="blog" content="Blog content"></meta>
          <meta name="keywords" content="blog, samuel davidson blog, web developer blog"></meta>
        </MetaTags>
        <Header />
        {posts.length === 0 ? (
          <div>
            <h2>No blog posts loaded yet!</h2>
          </div>
        ) : (
          <div>
            <Row>
              {' '}
              {posts.map(post => (
                <Col xs="3" key={post.id}>
                  {' '}
                  <Post post={post} />{' '}
                </Col>
              ))}
            </Row>
          </div>
          )}
      </div>
    )
  }
}

Blog.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
};
Blog.defaultProps = {
  posts: [
    {
    title: 'A First Post',
    content:'Hello! This is my first post to this blog!'
  },
  {
    title:'Blank Post',
    content:'This is a blank post'
  }
]
};


export default Container(Blog);