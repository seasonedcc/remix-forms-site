import { cx } from '~/helpers'

export default function Button({
  className,
  ...props
}: JSX.IntrinsicElements['button']) {
  return (
    <button
      className={cx(
        'inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-gray-400',
        className,
      )}
      {...props}
    />
  )
}
