import React, { useState, useEffect } from 'react'
import { BookOpen, PlusCircle } from 'lucide-react'
import ProblemList from './components/ProblemList'
import AddProblemForm from './components/AddProblemForm'
import ContributionGraph from './components/ContributionGraph'
import { Problem, AddProblemFormData } from './types'
import { loadProblems, saveProblems } from './services/problemStorage'
// test
// const importProblems: Problem[] = [
//   {
//     id: 1,
//     title: "Anagram Groups",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "-tuple can be key of dictionary\n-ord() gets ascii value of char\n-chr() gets char of ascii value",
//     submittedDate: "2024-09-17T15:45:00.000Z",
//     table: null,
//     dsaPattern: "array_strings",
//     needsRevision: false
//   },
//   {
//     id: 2,
//     title: "Two Integer Sum",
//     difficulty: "Easy",
//     completed: true,
//     link: "",
//     notes: "-subtract num from target to get desired value",
//     submittedDate: "2024-09-17T15:48:00.000Z",
//     table: null,
//     dsaPattern: "two_pointers",
//     needsRevision: false
//   },
//   {
//     id: 3,
//     title: "Top K Elements in List",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "-use Bucket sort if you need to group elements based on their frequency of appearance",
//     submittedDate: "2024-09-17T18:51:00.000Z",
//     table: null,
//     dsaPattern: "heap_priority_queue",
//     needsRevision: false
//   },
//   {
//     id: 4,
//     title: "Maximum Subarray",
//     difficulty: "Medium",
//     completed: true,
//     link: "https://leetcode.com/problems/maximum-subarray/description/",
//     notes: "-kadanes algorithm",
//     submittedDate: "2024-09-18T13:28:00.000Z",
//     table: null,
//     dsaPattern: "dynamic_programming",
//     needsRevision: false
//   },
//   {
//     id: 5,
//     title: "Products of Array Discluding Self",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "-prefix sum",
//     submittedDate: "2024-09-18T15:51:00.000Z",
//     table: null,
//     dsaPattern: "array_strings",
//     needsRevision: false
//   },
//   {
//     id: 6,
//     title: "Longest Consecutive Sequence",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "-use set, and iterate from previous num while num + 1 is available. Dont be afraid to nest loops",
//     submittedDate: "2024-09-20T13:24:00.000Z",
//     table: null,
//     dsaPattern: "array_strings",
//     needsRevision: false
//   },
//   {
//     id: 7,
//     title: "Valid Sudoku",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "",
//     submittedDate: "2024-09-20T22:59:00.000Z",
//     table: null,
//     dsaPattern: "array_strings",
//     needsRevision: false
//   },
//   {
//     id: 8,
//     title: "Valid Palindrome",
//     difficulty: "Easy",
//     completed: true,
//     link: "",
//     notes: "2 pointer, isalphanum()",
//     submittedDate: "2024-09-21T14:27:00.000Z",
//     table: null,
//     dsaPattern: "two_pointers",
//     needsRevision: false
//   },
//   {
//     id: 9,
//     title: "3Sum",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "Skip cases that alrady have been done. Two pointer : l and r pointer are coming towards each other.",
//     submittedDate: "2024-09-23T13:56:00.000Z",
//     table: null,
//     dsaPattern: "two_pointers",
//     needsRevision: false
//   },
//   {
//     id: 10,
//     title: "moveZeroes",
//     difficulty: "Easy",
//     completed: true,
//     link: "",
//     notes: "slow and fast pointers.\nfast: non-zero elements of the array.",
//     submittedDate: "2024-09-24T13:18:00.000Z",
//     table: null,
//     dsaPattern: "fast_slow_pointers",
//     needsRevision: false
//   },
//   {
//     id: 11,
//     title: "Max Water Container",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "water height cant be bigger than sedes height",
//     submittedDate: "2024-09-24T18:11:00.000Z",
//     table: null,
//     dsaPattern: "two_pointers",
//     needsRevision: false
//   },
//   {
//     id: 12,
//     title: "Validate Parentheses",
//     difficulty: "Easy",
//     completed: true,
//     link: "",
//     notes: "from collections import deque\nstack = deque()\nappend, pop, not",
//     submittedDate: "2024-09-25T15:41:00.000Z",
//     table: null,
//     dsaPattern: "stacks",
//     needsRevision: false
//   },
//   {
//     id: 13,
//     title: "Buy and Sell Crypto",
//     difficulty: "Easy",
//     completed: true,
//     link: "",
//     notes: "use for loop for right pointer",
//     submittedDate: "2024-09-27T13:45:00.000Z",
//     table: null,
//     dsaPattern: "two_pointers",
//     needsRevision: false
//   },
//   {
//     id: 14,
//     title: "Longest Substring Without Duplicates",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "iterate left pointer while not valid",
//     submittedDate: "2024-09-27T13:45:00.000Z",
//     table: null,
//     dsaPattern: "sliding_window",
//     needsRevision: false
//   },
//   {
//     id: 15,
//     title: "Daily Temperatures",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "Keep track of previous elements in stack and pop when you dont need them anymore.",
//     submittedDate: "2024-09-28T22:19:00.000Z",
//     table: null,
//     dsaPattern: "monotonic_stack_queue",
//     needsRevision: false
//   },
//   {
//     id: 16,
//     title: "Search a 2D Matrix",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "binary search to find row then again to find target",
//     submittedDate: "2024-09-30T14:20:00.000Z",
//     table: null,
//     dsaPattern: "binary_search",
//     needsRevision: false
//   },
//   {
//     id: 17,
//     title: "Eating Bananas",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "Binary search to find lowest integer that satisifes the solution. Dont return immediately after one solution is found.",
//     submittedDate: "2024-10-01T12:42:00.000Z",
//     table: null,
//     dsaPattern: "binary_search",
//     needsRevision: false
//   },
//   {
//     id: 18,
//     title: "Find Minimum in Rotated Sorted Array",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "",
//     submittedDate: "2024-10-01T17:36:00.000Z",
//     table: null,
//     dsaPattern: "binary_search",
//     needsRevision: false
//   },
//   {
//     id: 19,
//     title: "Time Based Key-Value Store",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "Keep iterating left or right until criteria met. for eg, keep iterating right to find max value that satisfies",
//     submittedDate: "2024-10-02T12:20:00.000Z",
//     table: null,
//     dsaPattern: "binary_search",
//     needsRevision: false
//   },
//   {
//     id: 20,
//     title: "Longest Repeating Substring With Replacement",
//     difficulty: "Medium",
//     completed: true,
//     link: "",
//     notes: "while condition is not valid iterate left pointer",
//     submittedDate: "2024-10-04T21:30:00.000Z",
//     table: null,
//     dsaPattern: "sliding_window",
//     needsRevision: false
//   }
// ];

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

  // const migrateProblemData = () => {
  //   const updatedProblems = [...problems, ...importProblems]
  //   setProblems(updatedProblems)
  //   saveProblems(updatedProblems)
  // }

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