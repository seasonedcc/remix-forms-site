import { cx } from '~/helpers'
import Pre from './pre'

export default function Code({
  className,
  children,
  ...props
}: { children: string } & JSX.IntrinsicElements['pre']) {
  return (
    <Pre
      {...props}
      className={cx('xl:flex-1 max-h-[60vh]', className)}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
