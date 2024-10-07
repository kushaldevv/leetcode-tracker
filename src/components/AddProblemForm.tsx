import React, { useState, useEffect } from 'react'
import { AddProblemFormData } from '../types'

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface AddProblemFormProps {
  onAddProblem: (formData: AddProblemFormData) => void
  onCancel: () => void
  existingPatterns: string[]
}

const AddProblemForm: React.FC<AddProblemFormProps> = ({ onAddProblem, onCancel, existingPatterns }) => {
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      submittedDate: date.toISOString(),
    }))
  }, [date])

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [formData, setFormData] = useState<AddProblemFormData>({
    title: '',
    difficulty: 'Easy',
    link: '',
    dsaPattern: '',
    needsRevision: false,
    submittedDate: date.toISOString(),
  })
  const [newPattern, setNewPattern] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddProblem(formData)
  }

  const handlePatternChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'new') {
      setFormData({ ...formData, dsaPattern: newPattern })
    } else {
      setFormData({ ...formData, dsaPattern: value })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow mb-3">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Difficulty*</label>
        <div className="mt-2 space-x-4">
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <label key={level} className="inline-flex items-center">
              <input
                required
                type="radio"
                name="difficulty"
                value={level}
                checked={formData.difficulty === level}
                onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      {/* <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => {
            day && setDate(day);
          }}
          onDayClick={() => setPopoverOpen(false)}
          initialFocus      
        />
      </PopoverContent>
    </Popover> */}
      </div>
      <div>
        <label htmlFor="dsaPattern" className="block text-sm font-medium text-gray-700">DSA Pattern*</label>
        <div className="mt-1 flex space-x-2">
          <select
            required
            id="dsaPattern"
            name="dsaPattern"
            value={formData.dsaPattern}
            onChange={handlePatternChange}
           
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Select a pattern</option>
            <option value="array_strings">Array and Strings</option>
            <option value="two_pointers">Two Pointers</option>
            <option value="sliding_window">Sliding Window</option>
            <option value="fast_slow_pointers">Fast and Slow Pointers (Tortoise and Hare)</option>
            <option value="stacks">Stacks</option>
            <option value="dfs">Depth-First Search (DFS)</option>
            <option value="bfs">Breadth-First Search (BFS)</option>
            <option value="backtracking">Backtracking</option>
            <option value="dynamic_programming">Dynamic Programming (DP)</option>
            <option value="greedy_algorithms">Greedy Algorithms</option>
            <option value="divide_conquer">Divide and Conquer</option>
            <option value="binary_search">Binary Search</option>
            <option value="topological_sort">Topological Sort</option>
            <option value="union_find">Union Find (Disjoint Set)</option>
            <option value="bit_manipulation">Bit Manipulation</option>
            <option value="tree_traversals">Tree Traversals</option>
            <option value="heap_priority_queue">Heap/Priority Queue</option>
            <option value="monotonic_stack_queue">Monotonic Stack/Queue</option>
            <option value="trie">Trie (Prefix Tree)</option>
            <option value="design_patterns">Design Patterns</option>
            <option value="mathematical_number_theory">Mathematical and Number Theory</option>
            {/* {existingPatterns.map((pattern) => (
              <option key={pattern} value={pattern}>{pattern}</option>
            ))}
            <option value="new">Add new pattern</option> */}

          </select>
          {formData.dsaPattern === 'new' && (
            <input
              type="text"
              value={newPattern}
              onChange={(e) => setNewPattern(e.target.value)}
              placeholder="Enter new pattern"
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          )}
        </div>
      </div>
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          // required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date*</label>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => {
            day && setDate(day);
          }}
          onDayClick={() => setPopoverOpen(false)}
          initialFocus      
        />
      </PopoverContent>
    </Popover>
      </div>
      {/* <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="needsRevision"
            checked={formData.needsRevision}
            onChange={handleChange}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Needs Revision</span>
        </label>
      </div> */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Problem
        </button>
      </div>
    </form>
  )
}

export default AddProblemForm