import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import _ from "lodash";
import { Link } from "react-router-dom";
import validateEmail from "../../utils.js/validateEmail";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, (field) => {
      return (
        <Field
          key={field.id}
          component={SurveyField}
          type="text"
          label={field.label}
          name={field.name}
        />
      );
    });
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <button className="teal btn-flat right white-text">
            Next <i className="material-icons right">arrow_forward</i>
          </button>
          <Link
            to="/surveys"
            className="red btn-flat left white-text"
            type="submit"
          >
            Cancel <i className="material-icons left">arrow_back</i>
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if ("" || !values.title) {
    errors.title = "You must provide title";
  }
  if ("" || !values.subject) {
    errors.subject = "You must provide Subject";
  }
  if ("" || !values.body) {
    errors.body = "You must provide body";
  }
  if ("" || !values.recipients) {
    errors.recipients = "You must provide emails";
  } else {
    errors.recipients = validateEmail(values.recipients);
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
