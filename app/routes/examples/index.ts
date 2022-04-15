import { redirect } from 'remix'
import { $path } from 'remix-routes'

export const loader = () => redirect($path('/examples/redirect'))
