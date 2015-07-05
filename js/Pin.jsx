var React = require('react'),
    utility = require('./utility');

module.exports = React.createClass({
  propTypes: {
    birthday: React.PropTypes.array
  },

  render() {
    if(utility.isBirthdayFormatCorrect(this.props.birthday)) {
      return (
        <code {...this.props}>
          {utility.getPinFromBirthday(this.props.birthday)}
        </code>
      )
    }
    else {
      return <code></code>
    }
  }

});

function padWith0(str){
  str = "" + str;
  while(str.length < 2) {
    str = "0" + str;
  }

  return str;
}
