import React from 'react'
import { Field, reduxForm } from 'redux-form'

const SurveyForm = ({handleSubmit}) => {
  return (
    <div>
      <form onSubmit={handleSubmit(values => console.log(values)) }>
        <Field
          type='text'
          name='surveyTitle'
          component='input'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm)
