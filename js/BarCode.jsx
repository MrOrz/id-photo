var React = require('react'),
    ioBarcode = require("io-barcode");

module.exports = React.createClass({
  propTypes: {
    code: React.PropTypes.string.isRequired
  },
  componentDidMount() {
    var img = React.findDOMNode(this.refs.img);
    try {
      var canvas = ioBarcode.CODE128B(
        this.props.code,
        {
          displayValue: true,
          height: 50,
          fontSize: 18,
          width: 1
        }
      );
      img.src = canvas.toDataURL();
    } catch (e) {
      console.error(e);
      img.alt = "您輸入的字無法編成條碼";
    }

  },
  render() {
    // Canvases are not printable, but images are.
    //
    return (
      <img ref="img" />
    )
  }
});