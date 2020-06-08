import { connect } from 'react-redux';
import { fetchUserPosts, deletePost } from '../../store/posts/actions';

function mapStateToProps(state, props) {
  const { match: { params: { id } } } = props;
  const {
    posts: {
      byId: {
        [id]: post,
      },
    },
  } = state;
  return { post };
}

const mapDispatchToProps = { fetchUserPosts, deletePost };
export default connect(mapDispatchToProps, mapStateToProps)