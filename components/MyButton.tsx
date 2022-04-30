import React, { MouseEventHandler } from 'react'

interface Props {
  className?: string
  text?: string
  onClick?: MouseEventHandler
}

function MyButton({ className, text, onClick }: Props) {
  return (
    <button
      className={
        'text-bold flex items-center justify-center space-x-2 rounded-full bg-blue-500 px-5 py-2 text-center text-white transition-all duration-100 hover:outline hover:outline-4 hover:outline-blue-900 active:bg-blue-900' +
        ' ' +
        className
      }
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default MyButton
