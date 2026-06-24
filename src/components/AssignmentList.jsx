import { CheckCircle2, Circle, Flag, Trash2 } from 'lucide-react'
import { formatDate, priorityWeight } from '../utils/format'

function AssignmentList({ assignments, onToggle, onDelete, showCompleted = false }) {
  const sortedAssignments = [...assignments].sort((a, b) => {
    const dateCompare = new Date(a.dueDate) - new Date(b.dueDate)
    if (dateCompare !== 0) return dateCompare
    return priorityWeight(b.priority) - priorityWeight(a.priority)
  })

  return (
    <section className="panel assignment-panel">
      <div className="panel-header">
        <div>
          <h2>{showCompleted ? 'All Assignments' : 'Open Assignments'} <Flag size={22} style={{verticalAlign: 'middle', marginLeft: '8px'}} /></h2>
          <p>{assignments.length} tasks in this list</p>
        </div>
      </div>

      <div className="assignment-list">
        {sortedAssignments.map((assignment) => (
          <article className={`assignment-card priority-${assignment.priority.toLowerCase()}`} key={assignment.id}>
            <button className="complete-button" onClick={() => onToggle(assignment.id)}>
              {assignment.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>
            <div>
              <h3>{assignment.title}</h3>
              <p>{assignment.course} - {assignment.owner || 'Unassigned'}</p>
              <span>Due {formatDate(assignment.dueDate)}</span>
            </div>
            <div className="assignment-actions">
              <strong>{priorityWeight(assignment.priority)}</strong>
              {onDelete && (
                <button className="action-button" onClick={() => onDelete(assignment.id)} aria-label="Delete assignment">
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AssignmentList
