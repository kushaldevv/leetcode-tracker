import React from 'react'
import { Problem } from '../types'

interface ContributionGraphProps {
  problems: Problem[]
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ problems }) => {
  const today = new Date()
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

  const getDaysBetweenDates = (start: Date, end: Date) => {
    const days = []
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date))
    }
    return days
  }

  const allDays = getDaysBetweenDates(oneYearAgo, today)

  const problemsByDate = problems.reduce((acc, problem) => {
    const date = problem.submittedDate.split('T')[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(problem)
    return acc
  }, {} as Record<string, Problem[]>)

  const getColorForDay = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    const problemsForDay = problemsByDate[dateString] || []

    if (problemsForDay.length === 0) return 'bg-gray-100'

    const difficultyColors = {
      Easy: 'bg-green-200',
      Medium: 'bg-yellow-200',
      Hard: 'bg-red-200'
    }

    if (problemsForDay.length === 1) {
      return difficultyColors[problemsForDay[0].difficulty]
    }

    // If multiple problems, blend colors
    return 'bg-gradient-to-br from-green-200 via-yellow-200 to-red-200'
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Contribution Graph</h2>
      <div className="flex flex-wrap">
        {allDays.map((date, index) => (
          <div
            key={index}
            className={`w-3 h-3 m-0.5 rounded-sm ${getColorForDay(date)}`}
            title={`${date.toDateString()}: ${problemsByDate[date.toISOString().split('T')[0]]?.length || 0} problems`}
          />
        ))}
      </div>
    </div>
  )
}

export default ContributionGraph