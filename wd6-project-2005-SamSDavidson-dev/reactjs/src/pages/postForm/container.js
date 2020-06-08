import {connect} from 'react-redux';
import {fetchPost, savePost} from '../../store/posts/actions';

function mapStateToProps(state, props){
  const { match: {params: { id }} } = props;

  const {
    posts:{
      byId:{
      [id]: post
      }
    }
  } = state;
  return {post}
}

const mapDispatchToProps = {fetchPost, savePost};

export default connect(mapDispatchToProps, mapStateToProps);