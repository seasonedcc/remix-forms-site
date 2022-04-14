import hljs from 'highlight.js/lib/common'
import {
  ActionFunction,
  LoaderFunction,
  useLoaderData,
  MetaFunction,
} from 'remix'
import { formAction } from 'remix-forms'
import { z } from 'zod'
import Form from '~/ui/form'
import Code from '~/ui/code'
import Heading from '~/ui/heading'
import { metaTags } from '~/helpers'
import SubHeading from '~/ui/sub-heading'
import { makeDomainFunction } from 'remix-domains'

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

export default function Index() {
  const { code } = useLoaderData()

  return (
    <div className="flex flex-col space-y-4 sm:space-y-8">
      <Heading>{title}</Heading>
      <SubHeading>{description}</SubHeading>
      <div className="flex flex-col space-y-6 space-x-0 xl:flex-row xl:space-x-6 xl:space-y-0">
        <Code>{code}</Code>
        <div className="xl:flex-1">
          <Form schema={schema} />
        </div>
      </div>
    </div>
  )
}
