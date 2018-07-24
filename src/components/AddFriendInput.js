import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './AddFriendInput.css';

class AddFriendInput extends Component {

  render () {
    return (
      <div>
        <input
        type="text"
        autoFocus="true"
        className={classnames('form-control', styles.addFriendInput)}
        placeholder="Type the name of a friend"
        value={this.state.name}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleSubmit.bind(this)} />

        <div className={classnames('gender', styles.gender)}>
          <p>Please select your gender: </p>
          M <input type="radio" value="Masculine" name="sex" onClick={this.handleChange.bind(this)}/> or
          F <input type="radio" value="Femenine" name="sex" onClick={this.handleChange.bind(this)}/>
          <span onClick={this.handleSubmit.bind(this)}> - Add friend - </span>
        </div>

      </div>   
    );
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
      sex: this.props.sex || ''
    };
  }

  handleChange (e) {
    if(e.target.type === 'text'){
      this.setState({ name: e.target.value });
    } else {
      this.setState({ sex: e.target.value });
    }
  }

  handleSubmit (e) {
    const name = this.state.name || 'No name';
    const sex = this.state.sex || 'Private';

    if (e.which === 13 || e.type === 'click') {
      this.props.addFriend(name, sex);
      this.setState({ name: '' , sex: ''});
    }
  }
}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput
