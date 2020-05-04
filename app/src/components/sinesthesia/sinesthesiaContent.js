import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-bootstrap";
import P5Wrapper from "react-p5-wrapper";
import Sketch02 from "./sketches/sketch02";
import Sketch04 from "./sketches/sketch04";

const SinesthesiaContent = (props) => {
  const [open, setOpen] = useState(false);
  const [hue, setHue] = props.features
    ? useState((props.features.key * 33) % 360)
    : useState(0);

  useEffect(() => {
    if (props.features) {
      setHue(props.features.key * 33);
    }
  });

  return (
    <>
      <div className="jumbotron">
        <div>
          <p>
            Sinesthesia is unique among audio visualizers in that it uses music
            as the seed for pieces of generative art. (By definition?)
            Generative art, much like human art, is never exactly the same. Make
            your suggestions below as to which aspects of your music inspire
            certain themes in the artwork and enjoy the result.
          </p>
        </div>
        <div>
          <button
            className="btn btn-large btn-primary"
            onClick={() => props.getToken()}
          >
            Click here to load Spotify data.
          </button>
          {props.track ? (
            <div className="div">
              Currently Playing: {props.track.name}
              <br />
              by {props.track.artists[0].name}
            </div>
          ) : (
            ""
          )}
          <button
            className="btn btn-secondary"
            onClick={() => setOpen(!open)}
            style={{ display: props.track ? "block" : "none" }}
            data-toggle="collapse"
            data-target="#track-features"
            aria-controls="track-features"
            aria-expanded={open}
          >
            Show Track Features
          </button>
          <Collapse in={open}>
            <div className="collapse" id="track-features">
              <div className="card card-body">
                {props.features
                  ? Object.keys(props.features).map((key) => {
                      return (
                        <li key={key}>
                          {key}: {props.features[key]}
                        </li>
                      );
                    })
                  : ""}
              </div>
            </div>
          </Collapse>
        </div>
      </div>
      <div>
        Processing will render here.
        <Sketch04 />
        {/* <Sketch02 hue={hue} /> */}
      </div>
    </>
  );
};

SinesthesiaContent.propTypes = {
  features: PropTypes.object,
  track: PropTypes.object,
  getToken: PropTypes.func,
};

export default SinesthesiaContent;
