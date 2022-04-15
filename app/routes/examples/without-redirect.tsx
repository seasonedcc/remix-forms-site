import hljs from 'highlight.js/lib/common'
import { ActionFunction, LoaderFunction, MetaFunction } from 'remix'
import { formAction } from 'remix-forms'
import { z } from 'zod'
import Form from '~/ui/form'
import { metaTags } from '~/helpers'
import { makeDomainFunction } from 'remix-domains'
import Example from '~/ui/example'

const title = 'The simplest form'
const description =
  'In this example, everything is inferred from the schema. Even the labels.'

export const meta: MetaFunction = () => metaTags({ title, description })

const code = `const schema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
})

const mutation = makeDomainFunction(schema)(async (values) => values)

export const action: ActionFunction = async ({ request }) =>
  await formAction({ request, schema, mutation })

export default () => <Form schema={schema} />`

const schema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
})

export const loader: LoaderFunction = () => ({
  code: hljs.highlight(code, { language: 'ts' }).value,
})

const mutation = makeDomainFunction(schema)(async (values) => values)

export const action: ActionFunction = async ({ request }) =>
  await formAction({ request, schema, mutation })

export default function Component() {
  return (
    <Example title={title} description={description}>
      <Form schema={schema} />
    </Example>
  )
}
