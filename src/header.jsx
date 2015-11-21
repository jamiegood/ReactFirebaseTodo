var React = require('react');
// var Button= require('./button');
// var ListItem = require('./list-item');

module.exports = React.createClass({

  handleClick: function(e) {

      this.add();
  },

  getInitialState: function() {
    return {
      text: ''
    }
  },
  render: function() {

    return <div className="input-group">
              <input
                value={this.state.text}
                onChange={this.handleInputChange}
                onKeyPress= {this.handleEnter}
                type="text"
                className="form-control" />
              <span className="input-group-btn">
                <button
                  onClick={this.handleClick}
                  className="btn btn-default"
                  type="button">
                  Add
                </button>
              </span>
          </div>
  },
  handleEnter: function(e) {
    if (e.key === 'Enter') {
      this.add();
    }
  },
  add: function(e) {
    console.log('hit enter');
    this.props.itemStore.push({
      text: this.state.text,
      done: false
    })
    this.setState({text: ""});
  },
  handleInputChange: function(e) {
    this.setState({text: e.target.value});
  }
});
