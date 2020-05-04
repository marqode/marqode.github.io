import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // email
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow() {
  return (
    <footer className="footer">
      <div className="row justify-content-center">
        <a href="https://github.com/marcb23" className="social">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a
          href="https://www.linkedin.com/in/marc-bucchieri-352b9877/"
          className="social"
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a href="https://www.instagram.com/marcbucchieri/" className="social">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div>
    </footer>
  );
}
