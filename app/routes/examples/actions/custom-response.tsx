import hljs from 'highlight.js/lib/common'
import { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { performMutation } from 'remix-forms'
import { z } from 'zod'
import Form from '~/ui/form'
import { metaTags } from '~/helpers'
import { makeDomainFunction } from 'remix-domains'
import type { UnpackData } from 'remix-domains'
import Example from '~/ui/example'

const title = 'Custom response'
const description =
  'In this example, a successful submission will render a custom JSON.'

export const meta: MetaFunction = () => metaTags({ title, description })

const code = `import { performMutation } from 'remix-forms'
import type { UnpackData } from 'remix-domains'

const schema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
})

const mutation = makeDomainFunction(schema)(async (values) => values)

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({ request, schema, mutation })

  if (result.success) {
    const data = result.data as UnpackData<typeof mutation>
    return { customName: data.firstName }
  } else {
    return result.errors
  }
}

export default () => <Form schema={schema} />`

const schema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
})

export const loader: LoaderFunction = () => ({
  code: hljs.highlight(code, { language: 'ts' }).value,
})

const mutation = makeDomainFunction(schema)(async (values) => values)

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({ request, schema, mutation })

  if (result.success) {
    const data = result.data as UnpackData<typeof mutation>
    return { customName: data.firstName }
  } else {
    return result.errors
  }
}

export default function Component() {
  return (
    <Example title={title} description={description}>
      <Form schema={schema} />
    </Example>
  )
}
