import React from 'react'

const Input = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements['input']
>(({ type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
    {...props}
  />
))

export default Input
