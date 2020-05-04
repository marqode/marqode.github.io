import React from "react";
import PropTypes from "prop-types";
import TextareaInput from "../common/TextareaInput";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

// export function lessonForm (props) {

const LessonForm = ({
  email,
  //   authors,
  onSave,
  onChange,
  sending = false,
  errors = {},
}) => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form onSubmit={onSave} className="md-form form-group">
          <h2>Contact Me</h2>
          {errors.onSave && (
            <div className="alert alert-danger" role="alert">
              {errors.onSave}
            </div>
          )}
          <TextInput
            name="name"
            key="name"
            label="Name"
            value={email.name}
            placeholder="Name"
            onChange={onChange}
            error={errors.title}
          />

          <TextInput
            name="address"
            key="address"
            label="Email"
            value={email.address}
            placeholder="Your Email Address"
            // options={authors.map((author) => ({
            //   value: author.id,
            //   text: author.name,
            // }))}
            onChange={onChange}
            error={errors.email}
          />
          <TextInput
            name="subject"
            key="subject"
            label="Subject"
            value={email.subject}
            placeholder="Subject"
            onChange={onChange}
            error={errors.title}
          />

          <TextareaInput
            name="message"
            key="message"
            label="Message"
            value={email.message}
            placeholder="Message"
            textarea={true}
            onChange={onChange}
            error={errors.message}
          />

          <button type="submit" disabled={sending} className="btn btn-primary">
            {sending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

LessonForm.propTypes = {
  email: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  sending: PropTypes.bool,
};

export default LessonForm;
