import { connect } from "react-redux";
import React from "react";
import formFields from "./formFields";
import _ from "lodash";
import * as actions from "../../actions/index";
import {withRouter} from 'react-router-dom'

const SurveyReview = ({ onSurveyCancel, formValues, submitSurvey,history }) => {
  const reviewFields = _.map(formFields, ({ id, name, label }) => {
    return (
      <div key={id}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your entries..</h5>
      <div>{reviewFields}</div>
      <button
        onClick={() => submitSurvey(formValues,history)}
        className="green btn-flat right white-text"
        type="submit"
      >
        Send Survey <i className="material-icons right">email</i>
      </button>
      <button
        onClick={onSurveyCancel}
        className="yellow darken-3 btn-flat left white-text"
      >
        Back <i className="material-icons left">arrow_back</i>
      </button>
    </div>
  );
};
function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}
export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
