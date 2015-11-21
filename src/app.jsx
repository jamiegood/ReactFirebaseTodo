var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://luminous-fire-5077.firebaseio.com/';

var Header = require('./header');
var List = require('./list');

var App = React.createClass({
  mixins: [ReactFire],
  //react method that will be called the componet put into dom
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },


  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }

  },

  render: function() {

    return <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
              <h2 className="text-center">
                To-Do List
              </h2>

              <Header itemStore={this.firebaseRefs.items} />
              <hr />
              <div className={"content " + (this.state.loaded ? "loaded" : "") }>
                <List items={this.state.items} />
                {this.deleteButton()}
              </div>
            </div>
          </div>

  },

  handleDataLoaded:  function() {
    console.log('firebase data finished loading');
    this.setState({loaded: true})
  },
  deleteButton: function(e) {
    if(!this.state.loaded) {
      return
    } else {
      return <div className="text-center clear-complete">
        <hr />
        <button
          className="btn btn-default"
          onClick={this.onDeleteDoneClick}>
          Clear Complete
        </button>
      </div>
    }

  },
  onDeleteDoneClick: function() {
    console.log('onDeleteDoneClick');
    for( var key in this.state.items) {
      console.log(key);
      if(this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  }
});



var element = React.createElement(App, {});
React.render(element, document.querySelector('.containerX'));
