var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://luminous-fire-5077.firebaseio.com/';

module.exports = React.createClass({

  handleClick: function(e) {

  },

  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },

  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);

  },
  render: function() {
    // var mytodos = this.props.items.map(function(todo) {
    //   return todo;
    // });

    console.log(this.props.item);
    console.log(this.props.item.key);
    //return <li>SSSSS{this.props.item.text} :: {this.props.item.done ? "DONE" : "not done"}</li>
    return <div className="input-group">
               <span className="input-group-addon">
                 <input type="checkbox" onChange={this.handleDoneChange} checked={this.state.done} />
               </span>
               <input type="text" className="form-control"
                 disabled={this.state.done}
                 value={this.state.text}
                 onChange={this.handleTextChange}/>
               <span className="input-group-btn">
                 {this.changesButtons()}
                  <button
                    className="btn btn-default"
                    onClick={this.handleDelete}
                    type="button">Delete</button>
                </span>
           </div>
  },
  handleDelete: function(e) {
    this.fb.remove();
  },
  handleTextChange: function(e) {
    console.log('text changed');
    this.setState({
      text: e.target.value,
      textChanged: true
    });
  },
  changesButtons() {
    if(!this.state.textChanged) {
      return null;
    } else {
      return [
        <button className="btn btn-default" onClick={this.handleSave}>Save</button>,
        <button
          className="btn btn-default"
          onClick={this.handleUndo}>
            Undo
          </button>
      ]
    }
  },
  handleUndo: function(e) {
    console.log('clicked  undow');
    this.setState({textChanged:false, text: this.props.item.text});
  },
  handleSave: function(e) {
    console.log('save', e.target.value);
    var update = {text: this.state.text};
    this.setState({textChanged: false});
    this.fb.update(update);
  },
  handleDoneChange: function(e) {
    console.log(' i have been clickd');
    console.log(e.target);
    console.log(e.target.checked);
    var update = {done: e.target.checked};
    this.setState(update);
    this.fb.update(update);
  }
});
