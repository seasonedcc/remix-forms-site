import { Form as RemixForm, FormProps } from 'remix-forms'
import { SomeZodObject } from 'zod'

export default function Form<Schema extends SomeZodObject>(
  props: FormProps<Schema>,
) {
  return <RemixForm<Schema> {...props} />
}
