import hljs from 'highlight.js/lib/common'
import { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { formAction } from 'remix-forms'
import { z } from 'zod'
import Form from '~/ui/form'
import { metaTags } from '~/helpers'
import { makeDomainFunction } from 'remix-domains'
import Example from '~/ui/example'

const title = 'Form with children'
const description =
  'In this example, we pass a children function to gain control over the Form UI.'

export const meta: MetaFunction = () => metaTags({ title, description })

const code = `const schema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
  howYouFoundOutAboutUs: z.enum(['fromAFriend', 'google']),
})

export default () => (
  <Form schema={schema}>
    {({ Field, Errors, Button }) => (
      <>
        <Field name="firstName" />
        <Field name="email" label="E-mail" />
        <em>You'll hear from us at this address 👆🏽</em>
        <Field
          name="howYouFoundOutAboutUs"
          options={[
            { name: 'Friend', value: 'fromAFriend' },
            { name: 'Search', value: 'google' },
          ]}
        />
        <Errors />
        <Button />
      </>
    )}
  </Form>
)`

const schema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
  howYouFoundOutAboutUs: z.enum(['fromAFriend', 'google']),
})

export const loader: LoaderFunction = () => ({
  code: hljs.highlight(code, { language: 'ts' }).value,
})

const mutation = makeDomainFunction(schema)(async (values) => values)

export const action: ActionFunction = async ({ request }) =>
  formAction({ request, schema, mutation })

export default function Component() {
  return (
    <Example title={title} description={description}>
      <Form schema={schema}>
        {({ Field, Errors, Button }) => (
          <>
            <Field name="firstName" />
            <Field name="email" label="E-mail" />
            <em>You'll hear from us at this address 👆🏽</em>
            <Field
              name="howYouFoundOutAboutUs"
              options={[
                { name: 'Friend', value: 'fromAFriend' },
                { name: 'Search', value: 'google' },
              ]}
            />
            <Errors />
            <Button />
          </>
        )}
      </Form>
    </Example>
  )
}
