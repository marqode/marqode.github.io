import React from "react";
import p5 from "p5";
import DoublePendulum from "./doublePendulum";

class Sketch03 extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  sketch = (p) => {
    // double dt; //delta t
    // double friction; //coefficient of friction

    //For colors
    let r = 1;
    let g = 1;
    let b = 1;
    let r_value = 0;
    let g_value = 0;
    let b_value = 0;
    let white = p.color(255, 255, 255, 5);
    let black = p.color(5, 5, 5, 65);
    let brown = p.color(112, 61, 0, 35);
    let pink = p.color(255, 192, 203);

    //Initialize pendulums
    let pendulum = new DoublePendulum();
    let pendulum2 = new DoublePendulum();
    let pupil_pendulum = new DoublePendulum();

    //For when I want to record
    // let recording = false;

    p.setup = () => {
      //   p.fullScreen(p.P3D);
      p.createCanvas(600, 600);
      //   p.smooth(8);
      //   p.frameRate(40);
      //   p.init();
    };

    const init = () => {
      /* 
   a higher dt makes the simulation go much faster, while a lower (or negative!)
   friction causes wacky, unrealistic but fascinating behavior.
   add gravitational constant (gc) back here when you want the pendulums to have standardized gravity (it's currently a member object
   of the pendulum class because you were trying to give them each different gravities, you crazy God you
  */
      //   dt = 0.000095;
      //   friction= -0.271828;
      p.background(255); //255 for white 0 for black

      /* Pendulum parameters: 
     DoublePendulum(center x coords, center y coords, length1, l2, mass1, mass2, angle1, angle2, angular velocity1, angular velocity2, gravitational constant)
  */

      //Create three pendulum objects
      //TODO: an interesting follow up would be to enclose this portion in a kind of genetic algorithm to produce stronger results over time
      //I could write code to assign scores to each of the output pendulums based on a variety of factors: # of times the pendulum goes around,
      //dominating color, distance from being a full circle upon completion, etc.
      //Then, I could optimize these values based on those criteria and create a more interesting simulator
      pendulum = new DoublePendulum(
        p.width / 2,
        p.height / 2,
        2,
        2,
        5.0,
        3.0,
        p.radians(p.random(360)),
        p.radians(p.random(360)),
        0.0,
        0.0,
        9.81
      );
      pendulum2 = new DoublePendulum(
        p.width / 2,
        p.height / 2,
        1,
        1,
        3.0,
        5.0,
        p.radians(p.random(360)),
        p.radians(p.random(360)),
        0.0,
        0.0,
        9.81
      );
      pupil_pendulum = new DoublePendulum(
        p.width / 2,
        p.height / 2,
        0.001,
        0.65,
        2.0,
        2.0,
        p.radians(p.random(360)),
        p.radians(p.random(360)),
        0.0,
        0.0,
        9.81
      );
    };

    p.draw = () => {
      p.background(0);
      p.fill(255, 0, 0);
      p.ellipse(p.width / 2, p.height / 2, 300, 300);
      //   for (let i = 0; i < 50; i++) {
      //     //Include as many pendulums as you want
      //     pendulum.draw(pendulum.update(), pendulum.update());
      //     pendulum.update();

      //     //pendulum2.draw();
      //     //pendulum2.update();

      //     //Using black as color2 here makes it a pupil
      //     pupil_pendulum.draw_weighted(pink, black);
      //     pupil_pendulum.update();
      //   }
    };
  };

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default Sketch03;
