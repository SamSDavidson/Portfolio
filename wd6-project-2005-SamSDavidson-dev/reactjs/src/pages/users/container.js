import { connect } from 'react-redux';
import {fetchUsers} from '../../store/users/actions';

function mapStateToProps(state) {
  const { users: {users, byId}} = state;
  const mappedUsers = users.map(id => byId[id])
  return {users: mappedUsers}
}

const mapDispatchToProps = {fetchUsers}

export default connect(mapStateToProps, mapDispatchToProps);