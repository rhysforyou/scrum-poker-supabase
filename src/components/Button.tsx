import React from "react"
import classNames from "classnames"

export interface ButtonProps {
  type?: "button" | "submit" | "reset"
  children: React.ReactNode
  className?: string
}

export function Button({ children, type, className }: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        "group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
