import hljs from 'highlight.js/lib/common'
import { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { formAction } from 'remix-forms'
import { z } from 'zod'
import Form from '~/ui/form'
import { metaTags } from '~/helpers'
import { makeDomainFunction } from 'remix-domains'
import Example from '~/ui/example'

const title = 'Labels and options'
const description =
  'In this example, we add a custom label to a field and custom options to our select. The rest is inferred from the schema.'

export const meta: MetaFunction = () => metaTags({ title, description })

const code = `const schema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
  howYouFoundOutAboutUs: z.enum(['fromAFriend', 'google']),
})

export default () => (
  <Form
    schema={schema}
    labels={{ email: 'E-mail Address' }}
    options={{
      howYouFoundOutAboutUs: [
        { name: 'A Friend', value: 'fromAFriend' },
        { name: 'Search Engine', value: 'google' },
      ],
    }}
  />
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
      <Form
        schema={schema}
        labels={{ email: 'E-mail Address' }}
        options={{
          howYouFoundOutAboutUs: [
            { name: 'A Friend', value: 'fromAFriend' },
            { name: 'Search Engine', value: 'google' },
          ],
        }}
      />
    </Example>
  )
}
