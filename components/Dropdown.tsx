import React, { MouseEventHandler, ReactElement } from 'react'

interface Props {
  className?: string
  anchorEl: React.MutableRefObject<HTMLElement | null>
  children: any
  open: boolean
  handleClose: Function
  keepMounted: boolean
  itemSize?: 'small' | 'large'
}

function Dropdown({
  className,
  anchorEl,
  children,
  open,
  handleClose,
  keepMounted,
  itemSize,
}: Props) {
  const rootEl = React.useRef<HTMLDivElement>(null)

  //   to make sure that the children are always array even if one child is passed..
  children = React.Children.toArray(children)
  React.useEffect(() => {
    if (anchorEl.current && rootEl.current) {
      anchorEl.current.appendChild(rootEl.current)
      anchorEl.current.style.position = 'relative'
    }

    // adding click listener
    document.addEventListener('mousedown', handleDropdownClick)
    if (anchorEl.current?.style) {
      anchorEl.current.style.position = 'relative'
    }

    if (!open) {
      // remove event listener if the drop down is closed
      document.removeEventListener('mousedown', handleDropdownClick)
      if (anchorEl.current) {
        anchorEl.current.style.visibility = 'visible'
      }
    }
    return () => {
      document.removeEventListener('mousedown', handleDropdownClick)
    }
  }, [open])

  function handleDropdownClick(event: MouseEvent) {
    if (!anchorEl.current?.contains(event.target as Node)) {
      handleClose()
    }
  }

  return (
    <div
      ref={rootEl}
      className={`${
        open
          ? anchorEl
            ? ' visible  animate-popIn'
            : 'display-none animate-popOut opacity-0'
          : 'hidden opacity-0'
      }  absolute top-full left-0 mt-2 flex h-fit flex-col overflow-hidden  rounded-xl p-0 text-white outline-2  outline-slate-700`}
    >
      {children?.map((child: ReactElement) => {
        return React.cloneElement(child, {
          className: `${child.props.className} ${
            itemSize === 'small' ? 'text-sm font-light' : 'text-base'
          }`,

          // key: child.props.key,
        })
      })}
    </div>
  )
}
Dropdown.defaultProps = {
  keepMounted: false,
  itemSize: 'small',
}

export default Dropdown
