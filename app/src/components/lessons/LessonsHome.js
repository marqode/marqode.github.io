import React, { useState, useEffect } from "react";
import LessonForm from "./LessonForm";
import * as emailApi from "../../api/emailApi";

const LessonsHome = (props) => {
  const [email, setEmail] = useState({
    name: "",
    address: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  // useEffect(() => {
  //   setEmail(...props.email);
  // }, []);

  function handleChange(event) {
    // destructure on first line to avoid errors
    const { name, value } = event.target;
    setEmail((prevEmail) => ({
      ...prevEmail,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name, address, subject, message } = email;
    const errors = {};

    // map to props for each component in courseForm
    if (!name) errors.title = "Title is required.";
    if (!address) errors.address = "Email address is required";
    if (!subject) errors.category = "Subject is required";
    if (!message) errors.category = "Message is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function sendEmail(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSending(true);
    return (
      emailApi
        .sendEmail(email)
        //     .then(() => {
        //       toast.success("Email setn!");
        //       history.push("/courses");
        //     })
        .catch((error) => {
          throw error;
        })
    );
  }

  return (
    <>
      <div className="jumbotron">
        <h2>Music Lessons</h2>
        <p>
          During the Covid pandemic and social distancing I am beginning to
          offer remote music lessons for aspriing pianists and guitar players.
          This is a work in progress so thank you for your patience! Feel free
          to contact me if you have any questions. This page will soon begin to
          fill up with video samples and testimonials.
        </p>
      </div>
      <LessonForm
        email={email}
        errors={errors}
        onChange={handleChange}
        onSave={sendEmail}
        sending={false}
      />
    </>
  );
};

export default LessonsHome;
