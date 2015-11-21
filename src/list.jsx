var React = require('react');
var ListItem= require('./list-item');

module.exports = React.createClass({

  handleClick: function(e) {

  },


  render: function() {
    // var mytodos = this.props.items.map(function(todo) {
    //   return todo;
    // });

    console.log(this.props.items);
    return <div>
      {this.renderlist()}
    </div>
  },

  renderlist: function() {

    console.log('loaded state', this.props.loaded);

    if(!this.props.items) {
      return <h4>
        Add a todo to get started
      </h4>
    } else {
      var children =[];

      console.log(this.props.items);
      for(var key in this.props.items) {
        var item = this.props.items[key];
        item.key = key;

        children.push(
          <ListItem
            item={this.props.items[key]}
            key={key}>
          </ListItem>
          );
      }

      return children;
    }
  }
});
