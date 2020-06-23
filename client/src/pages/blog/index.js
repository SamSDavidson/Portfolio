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
    const { posts } = this.props;

    return (
      <div>

      <Header />
        <h1>Blog Posts</h1>
        {posts.length === 0 ? (
          <div>
            <h2>No Posts loaded yet!</h2> <p>Be the first to add a post!</p>
          </div>
        ) : (
          <div>
              {posts.map(post => (
                  <Post post={post} />
              ))}
          </div>
        )}
      </div>
    );
  }
}

Blog.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  fetchPosts: PropTypes.func.isRequired
};
Blog.defaultProps = {
  posts: [
  ]
};


export default Container(Blog);