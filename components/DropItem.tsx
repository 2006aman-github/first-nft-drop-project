import React, { MouseEventHandler } from 'react'

interface Props {
  className?: string
  children: any
  onClick?: MouseEventHandler<HTMLDivElement>
}

function DropItem({ children, className, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={
        ' whitespace-nowrap bg-slate-800 px-5 py-2 text-white hover:bg-slate-500' +
        ' ' +
        className
      }
    >
      {children}
    </div>
  )
}

export default DropItem
