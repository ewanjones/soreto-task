import React, { Component, PropTypes } from 'react';
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';

class FriendList extends Component {

  constructor (props, context) {
    super(props, context);
    this.state = {
      currentPage: 1,
      friendsPerPage: 2
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render () {

    const { currentPage, friendsPerPage } = this.state;

    // Logic for displaying current friends
    const indexOfLastFriend = currentPage * friendsPerPage;
    const indexOfFirstFriend = indexOfLastFriend - friendsPerPage;
    const currentFriends = this.props.friends.slice(indexOfFirstFriend, indexOfLastFriend);  

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.friends.length / friendsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li className={styles.friendList}
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });    

    return (
      <div>
        <ul className={styles.friendList}>
          {
            currentFriends.map((friend, index) => {
              return (
                <FriendListItem
                  key={index}
                  id={index}
                  name={friend.name}
                  sex={friend.sex}
                  starred={friend.starred}
                  {...this.props.actions} />
              );
            })
          }
        </ul>
        <ul className={styles.friendList}>
          {renderPageNumbers}
        </ul>        
      </div>
    );
  }

}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
