import { cx } from '~/helpers'

export default function Pre({
  className,
  ...props
}: JSX.IntrinsicElements['pre']) {
  return (
    <pre
      {...props}
      className={cx(
        'bg-black font-mono text-white p-2 overflow-auto text-xs sm:text-sm scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-600 rounded',
        className,
      )}
    />
  )
}
