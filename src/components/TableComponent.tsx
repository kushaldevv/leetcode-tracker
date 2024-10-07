import React, { useState } from 'react'
import { TableData, ColumnData } from '../types'
import { PlusCircle, Trash2, RotateCcw } from 'lucide-react'

interface TableComponentProps {
  tableData: TableData | null
  onUpdateTable: (tableData: TableData) => void
}

const TableComponent: React.FC<TableComponentProps> = ({ tableData, onUpdateTable }) => {
  const [localTableData, setLocalTableData] = useState<TableData>(
    tableData || { columns: [], rows: [] }
  )

  const addColumn = () => {
    const newColumn: ColumnData = { name: `Column ${localTableData.columns.length + 1}`, isIteration: false }
    const newColumns = [...localTableData.columns, newColumn]
    const newRows = localTableData.rows.map(row => [...row, ''])
    updateTableData({ columns: newColumns, rows: newRows })
  }

  const addRow = () => {
    const newRow = localTableData.columns.map((column, index) => 
      column.isIteration ? localTableData.rows.length.toString() : ''
    )
    const newRows = [...localTableData.rows, newRow]
    updateTableData({ ...localTableData, rows: newRows })
  }

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = localTableData.rows.map((row, rIndex) =>
      rIndex === rowIndex ? row.map((cell, cIndex) => cIndex === colIndex ? value : cell) : row
    )
    updateTableData({ ...localTableData, rows: newRows })
  }

  const updateColumnName = (colIndex: number, value: string) => {
    const newColumns = localTableData.columns.map((col, index) => 
      index === colIndex ? { ...col, name: value } : col
    )
    updateTableData({ ...localTableData, columns: newColumns })
  }

  const toggleColumnIteration = (colIndex: number) => {
    const newColumns = localTableData.columns.map((col, index) => 
      index === colIndex ? { ...col, isIteration: !col.isIteration } : col
    )
    const newRows = localTableData.rows.map((row, rowIndex) => 
      row.map((cell, cellIndex) => 
        cellIndex === colIndex && newColumns[cellIndex].isIteration ? rowIndex.toString() : cell
      )
    )
    updateTableData({ columns: newColumns, rows: newRows })
  }

  const removeColumn = (colIndex: number) => {
    const newColumns = localTableData.columns.filter((_, index) => index !== colIndex)
    const newRows = localTableData.rows.map(row => row.filter((_, index) => index !== colIndex))
    updateTableData({ columns: newColumns, rows: newRows })
  }

  const removeRow = (rowIndex: number) => {
    const newRows = localTableData.rows.filter((_, index) => index !== rowIndex)
    updateTableData({ ...localTableData, rows: newRows })
  }

  const updateTableData = (newData: TableData) => {
    setLocalTableData(newData)
    onUpdateTable(newData)
  }

  const [showTable, setShowTable] = useState(localTableData.columns.length > 0)

  return (
    <div className="overflow-x-auto bg-white rounded-lg">
{!showTable &&        <button
          onClick={()=>setShowTable(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Table
        </button>}
      {showTable && <table className="min-w-full divide-y divide-gray-200 shadow">
        <thead className="bg-gray-50">
          <tr>
            { localTableData.columns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={column.name}
                    onChange={(e) => updateColumnName(index, e.target.value)}
                    className="text-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-transparent"
                  />
                  <button
                    onClick={() => toggleColumnIteration(index)}
                    className={`focus:outline-none ${column.isIteration ? 'text-indigo-600' : 'text-gray-400'}`}
                    title={column.isIteration ? "Iteration column" : "Regular column"}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeColumn(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                onClick={addColumn}
                className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {localTableData.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => updateCell(rowIndex, cellIndex, e.target.value)}
                    className="text-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    readOnly={localTableData.columns[cellIndex].isIteration}
                  />
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => removeRow(rowIndex)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
{showTable &&      <div className="px-6 py-4">
        <button
          onClick={addRow}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Row
        </button>
      </div>}
    </div>
  )
}

export default TableComponent