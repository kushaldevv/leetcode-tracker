import { Problem } from '../types'

const STORAGE_KEY = 'leetcode_problems'

export const loadProblems = (): Problem[] => {
  const storedProblems = localStorage.getItem(STORAGE_KEY)
  return storedProblems ? JSON.parse(storedProblems) : []
}

export const saveProblems = (problems: Problem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(problems))
}