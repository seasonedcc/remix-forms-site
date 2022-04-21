import React from 'react'

const Checkbox = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements['input']
>(({ type = 'checkbox', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded"
    {...props}
  />
))

export default Checkbox
