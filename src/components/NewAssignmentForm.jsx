import { useState } from 'react'

const initialForm = {
  title: '',
  course: '',
  dueDate: '',
  priority: 'Medium',
  owner: ''
}

function NewAssignmentForm({ onCreate }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  function updateField(field, value) {
    setForm({ ...form, [field]: value })
    if (fieldErrors[field]) {
      setFieldErrors({ ...fieldErrors, [field]: false })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const errors = {}
    if (!form.title) errors.title = true
    if (!form.course) errors.course = true
    if (!form.dueDate) errors.dueDate = true

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setError('Please fill every required field.')
      return
    }
    onCreate(form)
    setForm(initialForm)
    setError('')
    setFieldErrors({})
  }

  return (
    <form className="assignment-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input 
          className={fieldErrors.title ? 'input-error' : ''} 
          value={form.title} 
          onChange={(event) => updateField('title', event.target.value)} 
          placeholder="Sprint retrospective" 
        />
        {fieldErrors.title && <span className="field-error">This field is mandatory</span>}
      </label>
      <label>
        Course
        <input 
          className={fieldErrors.course ? 'input-error' : ''} 
          value={form.course} 
          onChange={(event) => updateField('course', event.target.value)} 
          placeholder="Project Lab" 
        />
        {fieldErrors.course && <span className="field-error">This field is mandatory</span>}
      </label>
      <label>
        Due date
        <input 
          className={fieldErrors.dueDate ? 'input-error' : ''} 
          type="date" 
          value={form.dueDate} 
          onChange={(event) => updateField('dueDate', event.target.value)} 
        />
        {fieldErrors.dueDate && <span className="field-error">This field is mandatory</span>}
      </label>
      <label>
        Priority
        <select value={form.priority} onChange={(event) => updateField('priority', event.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </label>
      <label>
        Owner
        <input value={form.owner} onChange={(event) => updateField('owner', event.target.value)} placeholder="Student name" />
      </label>
      <button className="primary-button" type="submit">Create assignment</button>
    </form>
  )
}

export default NewAssignmentForm
