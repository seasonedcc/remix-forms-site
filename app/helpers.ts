import { compose, join, reject, isBoolean, isNil, flatten } from 'lodash/fp'

export const cx = (...args: unknown[]) =>
  compose(join(' '), reject(isBoolean), reject(isNil), flatten)(args)
