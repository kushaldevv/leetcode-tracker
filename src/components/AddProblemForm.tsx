import React, { useState } from 'react'
import { AddProblemFormData } from '../types'

interface AddProblemFormProps {
  onAddProblem: (formData: AddProblemFormData) => void
  onCancel: () => void
  existingPatterns: string[]
}

const AddProblemForm: React.FC<AddProblemFormProps> = ({ onAddProblem, onCancel, existingPatterns }) => {
  const [formData, setFormData] = useState<AddProblemFormData>({
    title: '',
    difficulty: 'Easy',
    link: '',
    dsaPattern: '',
    needsRevision: false,
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
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
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
        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
        <div className="mt-2 space-x-4">
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <label key={level} className="inline-flex items-center">
              <input
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
      </div>
      <div>
        <label htmlFor="dsaPattern" className="block text-sm font-medium text-gray-700">DSA Pattern</label>
        <div className="mt-1 flex space-x-2">
          <select
            id="dsaPattern"
            name="dsaPattern"
            value={formData.dsaPattern}
            onChange={handlePatternChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a pattern</option>
            {existingPatterns.map((pattern) => (
              <option key={pattern} value={pattern}>{pattern}</option>
            ))}
            <option value="new">Add new pattern</option>
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
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">LeetCode Link</label>
        <input
          type="url"
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
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
      </div>
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