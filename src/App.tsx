import React, { useState, useEffect } from 'react'
import { BookOpen, PlusCircle } from 'lucide-react'
import ProblemList from './components/ProblemList'
import AddProblemForm from './components/AddProblemForm'
import ContributionGraph from './components/ContributionGraph'
import { Problem, AddProblemFormData } from './types'
import { loadProblems, saveProblems } from './services/problemStorage'
// test

const App: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [filters, setFilters] = useState({
    difficulty: 'All',
    pattern: 'All',
    revision: 'All'
  })

  useEffect(() => {
    const loadedProblems = loadProblems()
    setProblems(loadedProblems)
  }, [])

  const migrateProblemData = () => {
    const updatedProblems = [...problems, ...importProblems]
    setProblems(updatedProblems)
    saveProblems(updatedProblems)
  }

  const handleAddProblem = (formData: AddProblemFormData) => {
    const newProblem: Problem = {
      id:problems.length > 0 ? problems[problems.length - 1].id + 1 : 1,
      ...formData,
      completed: false,
      // submittedDate: new Date().toISOString(),
      table: null,
      notes: '',
    }
    const updatedProblems = [...problems, newProblem]
    setProblems(updatedProblems)
    saveProblems(updatedProblems)
    setShowAddForm(false)
  }

  const handleToggleCompletion = (id: number) => {
    const updatedProblems = problems.map(problem =>
      problem.id === id ? { ...problem, completed: !problem.completed } : problem
    )
    setProblems(updatedProblems)
    saveProblems(updatedProblems)
  }

  const handleUpdateNotes = (id: number, notes: string) => {
    const updatedProblems = problems.map(problem =>
      problem.id === id ? { ...problem, notes } : problem
    )
    setProblems(updatedProblems)
    saveProblems(updatedProblems)
  }

  const handleUpdateTable = (id: number, tableData: Problem['table']) => {
    const updatedProblems = problems.map(problem =>
      problem.id === id ? { ...problem, table: tableData } : problem
    )
    setProblems(updatedProblems)
    saveProblems(updatedProblems)
  }

  const handleDeleteProblem = (id: number) => {
    const updatedProblems = problems.filter(problem => problem.id !== id)
    setProblems(updatedProblems)
    saveProblems(updatedProblems)
  }

  const handleToggleRevision = (id: number) => {
    const updatedProblems = problems.map(problem =>
      problem.id === id ? { ...problem, needsRevision: !problem.needsRevision } : problem
    )
    setProblems(updatedProblems)
    saveProblems(updatedProblems)
  }

  const existingPatterns = Array.from(new Set(problems.map(p => p.dsaPattern).filter(Boolean)))

  const filteredProblems = problems.filter(problem => {
    return (
      (filters.difficulty === 'All' || problem.difficulty === filters.difficulty) &&
      (filters.pattern === 'All' || problem.dsaPattern === filters.pattern) &&
      (filters.revision === 'All' || 
        (filters.revision === 'Needs Revision' && problem.needsRevision) ||
        (filters.revision === 'No Revision' && !problem.needsRevision))
    )
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        <BookOpen className="h-8 w-8 mr-2 text-indigo-600" />
        LeetCode Tracker🗿
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <ContributionGraph problems={problems} />
            <div className="mb-4 flex space-x-4">
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                className="pl-2 h-8 block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <select
                value={filters.pattern}
                onChange={(e) => setFilters({...filters, pattern: e.target.value})}
                className="pl-2 h-8 block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="All">All Patterns</option>
                {existingPatterns.map(pattern => (
                  <option key={pattern} value={pattern}>{pattern.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())}</option>
                ))}
              </select>
              <select
                value={filters.revision}
                onChange={(e) => setFilters({...filters, revision: e.target.value})}
                className="pl-2 h-8 block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="All">All Revision Status</option>
                <option value="Needs Revision">Needs Revision</option>
                <option value="No Revision">No Revision</option>
              </select>
            </div>
            
            {showAddForm ? (
              <AddProblemForm
                onAddProblem={handleAddProblem}
                onCancel={() => setShowAddForm(false)}
                existingPatterns={existingPatterns}
              />
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Problem
              </button>
              
            )}
              {/* <button
                onClick={() => migrateProblemData()}
                className="ml-4 mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Import Problem
              </button> */}
            <ProblemList
              problems={filteredProblems}
              onToggleCompletion={handleToggleCompletion}
              onUpdateNotes={handleUpdateNotes}
              onUpdateTable={handleUpdateTable}
              onDeleteProblem={handleDeleteProblem}
              onToggleRevision={handleToggleRevision}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App