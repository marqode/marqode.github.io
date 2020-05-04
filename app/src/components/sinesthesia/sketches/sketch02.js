import React from "react";
import p5 from "p5";
import PropTypes from "prop-types";

class Sketch02 extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  sketch = (p) => {
    let x = 100;
    let y = 100;

    p.setup = () => {
      p.createCanvas(200, 200);
      p.colorMode(p.HSB);
    };

    p.draw = () => {
      p.background(0);
      p.fill(this.props.hue, 250, 100);
      p.rect(x, y, 50, 50);
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}
Sketch02.propTypes = {
  hue: PropTypes.number.isRequired,
};

export default Sketch02;
