import React from 'react'

const Select = React.forwardRef<
  HTMLSelectElement,
  JSX.IntrinsicElements['select']
>((props, ref) => (
  <select
    ref={ref}
    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md text-gray-800"
    {...props}
  />
))

export default Select
