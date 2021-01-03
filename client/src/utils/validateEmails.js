const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const validateEmails = (emails) => {
  const invalidEmails = emails.split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false)
    if(invalidEmails.length) {
      return `These emails are invalid: ${invalidEmails}`
    }

    return
}

export const FIELDS = [
  {label: 'Survey Title', name: 'title'},
  {label: 'Subject Line', name: 'subject'},
  {label: 'Email Body', name: 'body'},
  {label: 'Recipient List', name: 'recipients'}
]
