import React, { useState } from 'react'
import { CheckCircle, Circle, ExternalLink, Trash2, RefreshCw } from 'lucide-react'
import { Problem } from '../types'
import TableComponent from './TableComponent'

interface ProblemListProps {
  problems: Problem[]
  onToggleCompletion: (id: number) => void
  onUpdateNotes: (id: number, notes: string) => void
  onUpdateTable: (id: number, tableData: Problem['table']) => void
  onDeleteProblem: (id: number) => void
  onToggleRevision: (id: number) => void
}

const ProblemList: React.FC<ProblemListProps> = ({
  problems,
  onToggleCompletion,
  onUpdateNotes,
  onUpdateTable,
  onDeleteProblem,
  onToggleRevision
}) => {
  const [editingNotes, setEditingNotes] = useState<number | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-500'
      case 'Medium':
        return 'text-yellow-500'
      case 'Hard':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {problems.slice().reverse().map((problem) => (
          <li key={problem.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => onToggleCompletion(problem.id)}
                  className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  {problem.completed ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <Circle className="h-6 w-6" />
                  )}
                </button>
                <div className="min-w-0 flex-1">
                  <p className={`text-xl font-medium ${getDifficultyColor(problem.difficulty)} truncate`}>{problem.title.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())}</p>
                  <p className={`text-md text-indigo-600`}>
                  Pattern: {problem.dsaPattern.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()) || 'Not specified'}
                  </p>
                  {/* <p className="text-md text-gray-600">DSA Pattern: {problem.dsaPattern || 'Not specified'}</p> */}
                  <p className="text-sm text-gray-600">Submitted: {formatDate(problem.submittedDate)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onToggleRevision(problem.id)}
                  className={`flex-shrink-0 p-1 rounded-full ${
                    problem.needsRevision ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
                  } hover:bg-yellow-200 transition-colors duration-200`}
                  title={problem.needsRevision ? "Needs revision" : "Mark for revision"}
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <a
                  href={problem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
                <button
                  onClick={() => onDeleteProblem(problem.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-2">
              {editingNotes === problem.id ? (
                <textarea
                  className="w-full p-2 border rounded"
                  value={problem.notes}
                  onChange={(e) => onUpdateNotes(problem.id, e.target.value)}
                  onBlur={() => setEditingNotes(null)}
                  autoFocus
                />
              ) : (
                <p
                  className="text-sm text-gray-600 cursor-pointer"
                  onClick={() => setEditingNotes(problem.id)}
                >
                  {problem.notes || 'Add notes...'}
                </p>
              )}
            </div>
            <div className="mt-4">
              <TableComponent
                tableData={problem.table}
                onUpdateTable={(tableData) => onUpdateTable(problem.id, tableData)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProblemList