import { Link } from 'remix'
import Button from './button'

export default function ButtonLink({
  to,
  ...props
}: { to: string } & JSX.IntrinsicElements['button']) {
  return (
    <Link to={to}>
      <Button {...props} />
    </Link>
  )
}
