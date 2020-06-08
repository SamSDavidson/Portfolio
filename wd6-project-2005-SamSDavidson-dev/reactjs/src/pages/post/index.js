import styles from './post.module.css';

import React from 'react';
import PropTypes from 'prop-types';

import { Control, Field, TextArea } from 'bloomer';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import PostDetails from '../../components/postDetails';
import PostSlugline from '../../components/postSlugline';
import PostContainer from './container';

class Post extends React.Component {
  constructor(props) {
    super(props);
    const {
      fetchPost,
      match: {
        params: { postId },
      },
    } = props;
    this.state = { focused: false, newComment: '' };
    fetchPost(postId);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      addComment,
      post: { id },
    } = this.props;
    const { newComment } = this.state;
    addComment({ postId: id, text: newComment });
    this.setState({ focused: false, newComment: '' });
  };

  handleInputChange = (event) => {
    // pull the name of the input and value of input out of the event object
    const {
      target: { name, value },
    } = event;
    // update the state to a key of the name of the input and value of the value of the input
    // ex: type: 'private'
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { comments, loggedIn, post } = this.props;
    const { focused, newComment } = this.state;
    return (
      <div className={styles.contentBox}>
        <article className={styles.post}>
          <h1 className={styles.heading}>{post.title}</h1>
          <PostSlugline post={post} />
          <div className={styles.content}>
            <ReactMarkdown source={post.content} />
          </div>
          <PostDetails post={post} />
        </article>
        <h2 className={styles.subTitle}>Comments</h2>
        {loggedIn && (
          <form onSubmit={this.onSubmit}>
            <Field>
              <Control>
                <TextArea
                  placeholder="Add a comment"
                  className={styles.commentInput}
                  onChange={this.handleInputChange}
                  value={newComment}
                  name="newComment"
                  rows="2"
                  onFocus={() => this.setState({ focused: true })}
                />
              </Control>
            </Field>
            {focused && (
              <button type="submit" className={styles.button}>
                Post Comment
              </button>
            )}
          </form>
        )}
        {!loggedIn && (
          <p>
            <Link to="/login">Login</Link>
            {` or `}
            <Link to="/signup">Sign up </Link>
            to create a comment
          </p>
        )}

        {comments.map((comment) => (
          <div className={styles.comment} key={comment.id}>
            <p>
              <strong>{comment.User.username}</strong>
              {` ${moment(comment.createdAt).fromNow()}`}
            </p>
            <p className={styles.commentContent}>{comment.content}</p>
          </div>
        ))}
      </div>
    );
  }
}

Post.propTypes = {
  addComment: PropTypes.func,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
    })
  ),
  fetchPost: PropTypes.func,
  loggedIn: PropTypes.bool,
  post: PropTypes.shape({
    commentCount: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
    votes: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        vote: PropTypes.number,
      })
    ),
  }),
};

Post.defaultProps = {
  addComment: () => {},
  comments: [],
  fetchPost: () => {},
  loggedIn: true,
  post: {},
};

export default PostContainer(Post);
