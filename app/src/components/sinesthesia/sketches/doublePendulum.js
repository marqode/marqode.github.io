// import p5 from "p5";

const friction = -0.271828;
const dt = 0.000095;

class Pendulum {
  //Variable initialization
  //  phi1, omega1, phi2, omega2;
  //  mass1, mass2;
  //  length1, length2;
  // float x1, y1, x2, y2;
  // float  cx, cy;
  //  gc;

  //Variables for RK4
  // [] k1, l1, k2, l2;

  constructor(
    cx,
    cy,
    length1,
    length2,
    mass1,
    mass2,
    phi1,
    phi2,
    omega1,
    omega2,
    gc
  ) {
    this.cx = cx;
    this.cy = cy;
    this.length1 = length1;
    this.phi1 = phi1;
    this.omega1 = omega1;
    this.mass1 = mass1;
    this.k1 = [];
    this.l1 = [];
    this.length2 = length2;
    this.phi2 = phi2;
    this.omega2 = omega2;
    this.mass2 = mass2;
    this.k2 = [];
    this.l2 = [];
    this.gc = gc;
    this.x1;
    this.y1;
    this.x2;
    this.y2;

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.draw_weighted = this.draw_weighted.bind(this);
  }
  // delta angular velo
  domega1(phi1, phi2, omega1, omega2) {
    return (
      (-this.gc * (2 * this.mass1 + this.mass2) * Math.sin(phi1) -
        this.mass2 * this.gc * Math.sin(phi1 - 2 * phi2) -
        2 *
          Math.sin(phi1 - phi2) *
          this.mass2 *
          (omega2 * omega2 * this.length2 +
            omega1 * omega1 * this.length1 * Math.cos(phi1 - phi2))) /
        (this.length1 *
          (2 * this.mass1 +
            this.mass2 -
            this.mass2 * Math.cos(2 * phi1 - 2 * phi2))) -
      friction * omega1
    );
  }

  //delta angular velo
  domega2(phi1, phi2, omega1, omega2) {
    return (
      (2 *
        Math.sin(phi1 - phi2) *
        (omega1 * omega1 * this.length1 * (this.mass1 + this.mass2) +
          this.gc * (this.mass1 + this.mass2) * Math.cos(phi1) +
          omega2 *
            omega2 *
            this.length2 *
            this.mass2 *
            Math.cos(phi1 - phi2))) /
        (this.length2 *
          (2 * this.mass1 +
            this.mass2 -
            this.mass2 * Math.cos(2 * phi1 - 2 * phi2))) -
      friction * omega2
    );
  }

  /* This function originally was void, but I have it return the subsequent  (this part can be updated to fit one's liking - currently, 
        uses the angular velocity to calculate a random 
       The critical part of this function is the Runge-Katta fourth-order method approximation of the differential equations for 
        pendulum movement, which allows the program to plot the motion of the pendulums
    */

  update = (p5) => {
    this.k1[0] = dt * this.omega1;
    this.l1[0] =
      dt * this.domega1(this.phi1, this.phi2, this.omega1, this.omega2);
    this.k1[1] = dt * (this.omega1 + this.l1[0] / 2);
    this.l1[1] =
      dt *
      this.domega1(
        this.phi1 + this.k1[0] / 2,
        this.phi2,
        this.omega1 + this.l1[0] / 2,
        this.omega2
      );
    this.k1[2] = dt * (this.omega1 + this.l1[1] / 2);
    this.l1[2] =
      dt *
      this.domega1(
        this.phi1 + this.k1[1] / 2,
        this.phi2,
        this.omega1 + this.l1[1] / 2,
        this.omega2
      );
    this.k1[3] = dt * (this.omega1 + this.l1[2]);
    this.l1[3] =
      dt *
      this.domega1(
        this.phi1 + this.k1[2],
        this.phi2,
        this.omega1 + this.l1[2],
        this.omega2
      );
    this.k2[0] = dt * this.omega2;
    this.l2[0] =
      dt * this.domega2(this.phi1, this.phi2, this.omega1, this.omega2);
    this.k2[1] = dt * (this.omega2 + this.l2[0] / 2);
    this.l2[1] =
      dt *
      this.domega2(
        this.phi1,
        this.phi2 + this.k2[0] / 2,
        this.omega1,
        this.omega2 + this.l2[0] / 2
      );
    this.k2[2] = dt * (this.omega2 + this.l2[1] / 2);
    this.l2[2] =
      dt *
      this.domega2(
        this.phi1,
        this.phi2 + this.k2[1] / 2,
        this.omega1,
        this.omega2 + this.l2[1] / 2
      );
    this.k2[3] = dt * (this.omega2 + this.l2[2]);
    this.l2[3] =
      dt *
      this.domega2(
        this.phi1,
        this.phi2 + this.k2[2],
        this.omega1,
        this.omega2 + this.l2[2]
      );

    this.phi1 =
      this.phi1 +
      (this.k1[0] + 2 * this.k1[1] + 2 * this.k1[2] + this.k1[3]) / 6;
    this.omega1 =
      this.omega1 +
      (this.l1[0] + 2 * this.l1[1] + 2 * this.l1[2] + this.l1[3]) / 6;
    this.phi2 =
      this.phi2 +
      (this.k2[0] + 2 * this.k2[1] + 2 * this.k2[2] + this.k2[3]) / 6;
    this.omega2 =
      this.omega2 +
      (this.l2[0] + 2 * this.l2[1] + 2 * this.l2[2] + this.l2[3]) / 6;
    this.x1 = this.cx + 100 * this.length1 * Math.sin(this.phi1);
    this.y1 = this.cy + 100 * this.length1 * Math.cos(this.phi1);
    this.x2 = this.x1 + 100 * this.length2 * Math.sin(this.phi2);
    this.y2 = this.y1 + 100 * this.length2 * Math.cos(this.phi2);

    //Change me for fun  options!
    let r_value = p5.noise(this.omega1) * 255;
    let g_value = p5.noise(this.omega2) * 255;
    let b_value = p5.noise(this.omega1) * 255;

    let c = p5.color(r_value, g_value, b_value, 10);
    return c;
  };

  draw_weighted(c1, c2, p5) {
    // Error here with x1, y1
    // if (p5.random(1) < 0.1) {
    //   console.log("x, y" + this.x1, this.y1);
    // }
    //line(cx, cy, omega2, x1, y1, (-omega1));
    // c = (((x1 % 255) / 255) * 120, ((y1 % 255) / 255) * 60, 0, 35);
    p5.stroke(c1, 5);
    p5.strokeWeight(5.0);
    p5.line(this.cx, this.cy, this.omega1, this.x1, this.y1, this.omega2);
    p5.stroke(c2, 95);
    p5.strokeWeight(5.0);
    p5.line(this.x1, this.y1, this.omega1, this.x2, this.y2, -this.omega2);

    //fill(0);
  }

  draw(c1, c2, p5) {
    p5.stroke(c2);
    p5.strokeWeight(0.5);
    p5.line(this.cx, this.cy, this.omega2, this.x1, this.y1, -this.omega1);
    p5.stroke(c1);
    p5.line(this.x1, this.y1, this.omega1, this.x2, this.y2, -this.omega2);
    //fill(0);

    // p.ellipse(x1, y1, omega1, omega2);
    // p.fill(c);
    // p.ellipse(x2, y2, 2, 2);
    // p.fill(c);
  }
}

export default Pendulum;
