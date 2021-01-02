import React from 'react'
import { Field, reduxForm } from 'redux-form'
import SurveyField from './SurveyField'

const SurveyForm = ({handleSubmit}) => {
  const fields = [
    {label: 'Survey Title', name: 'title'},
    {label: 'Subject Line', name: 'subject'},
    {label: 'Email Body', name: 'body'},
    {label: 'Recipient List', name: 'emails'}
  ]

  const renderFields = () => (
    <div>
      {fields.map(({label, name}) => (
        <Field
          key={name}
          label={label}
          type='text'
          name={name}
          component={SurveyField}
        />
      ))}
    </div>
  )

  return (
    <div>
      <form onSubmit={handleSubmit(values => console.log(values)) }>
        {renderFields()}
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm)
