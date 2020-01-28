import React, {Component} from 'react';
import {compose} from 'redux';
import {withFirebase} from '../Firebase';
import {convertObjectstoArray} from '../../shared/utility';
import * as ACCESSLEVEL from '../../shared/accessLevel'
import {withAuthorization} from '../Session';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        this.props.firebase.users().on('value', snapshot => {
            this.setState({
                users: convertObjectstoArray(snapshot.val()),
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const {users, loading} = this.state;

        return (
            <div>
                <h1>Admin</h1>
                {loading && <div>Loading ...</div>}
                <UserList users={users}/>

            </div>
        );
    }
}

const UserList = ({users}) => (
    <ul>
        {users.map(user => (
            <li key={user.id}>
        <span>
          <strong>ID:</strong> {user.id}
        </span>
                <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
                <span>
          <strong>Username:</strong> {user.username}
        </span>
            </li>
        ))}
    </ul>
);

const condition = authUser =>
    authUser && authUser.accessLevel >= ACCESSLEVEL.ADMINISTRATOR;


export default compose(
    withFirebase,
    withAuthorization(condition)
)(AdminPage);