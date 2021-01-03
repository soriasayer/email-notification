import _ from "lodash";
import React from 'react';
import { connect } from "react-redux";
import { FIELDS } from "../../utils/validateEmails";

const SurveyFormReview = ({onCancel, formValues}) => {
  return (
    <div>
      <h5>Pleas confirm your entries</h5>
      <div>
        {
          _.map(FIELDS, ({label, name}) => (
            <div key={name}>
              <label>{label}</label>
              <div>{formValues[name]}</div>
            </div>
          ))
        }
      </div>
      <button
        className='yellow darken-3 btn-flat'
        style={{marginTop: 20}}
        onClick={onCancel}
      >
        Back
      </button>
    </div>
  )
}

const mapStateToProps = ({form}) => {
  return {
    formValues: form.surveyForm.values
  }
}

export default connect(mapStateToProps)(SurveyFormReview)
