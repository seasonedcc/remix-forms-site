import hljs from 'highlight.js/lib/common'
import {
  ActionFunction,
  useActionData,
  LoaderFunction,
  useLoaderData,
} from 'remix'
import { formAction } from 'remix-forms'
import { z } from 'zod'
import Form from '~/ui/form'
import {
  BeakerIcon,
  ScaleIcon,
  ShieldCheckIcon,
  CloudIcon,
  ClipboardCheckIcon,
  CursorClickIcon,
} from '@heroicons/react/solid'
import Feature from '~/ui/feature'
import ButtonLink from '~/ui/button-link'
import Heading from '~/ui/heading'
import Code from '~/ui/code'

const code = `import { ActionFunction, useActionData, LoaderFunction, useLoaderData } from 'remix'
import { formAction, Form } from 'remix-forms'
import { z } from 'zod'

const schema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
  source: z.string().nonempty(),
})

export const loader: LoaderFunction = () => ({
  sources: [
    { name: 'From a friend', value: 'friend' },
    { name: 'Google', value: 'google' },
  ],
})

export const action: ActionFunction = async ({ request }) =>
  await formAction({
    request,
    schema,
    mutation: async (values) => { console.log(values) },
    successPath: '/?success=true',
  })

export default function Index() {
  const { sources } = useLoaderData()
  const data = useActionData()

  return (
    <Form
      labels={{
        firstName: 'First name',
        email: 'E-mail',
        source: 'How did you find out about us?',
      }}
      options={{ source: sources }}
      schema={schema}
      errors={data?.errors}
      values={data?.values}
    />
  )
}`

const schema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
  source: z.string().nonempty(),
})

export const loader: LoaderFunction = () => ({
  code: hljs.highlight(code, { language: 'ts' }).value,
  sources: [
    { name: 'From a friend', value: 'friend' },
    { name: 'Google', value: 'google' },
  ],
})

export const action: ActionFunction = async ({ request }) =>
  await formAction({
    request,
    schema,
    mutation: async (values) => {
      console.log(values)
    },
    successPath: '/?success=true',
  })

export default function Index() {
  const { code, sources } = useLoaderData()
  const data = useActionData()

  return (
    <div className="flex flex-col space-y-8 sm:space-y-16">
      <Heading>
        Magically create forms
        <br />+ actions in Remix
      </Heading>
      <div className="flex flex-col space-y-6 space-x-0 xl:flex-row xl:space-x-6 xl:space-y-0">
        <Code>{code}</Code>
        <div className="xl:flex-1">
          <h3 className="text-center text-gray-400 text-lg pb-6">
            This tiny code creates the form below 👇🏽
          </h3>
          <h2 className="text-center text-white text-xl md:text-3xl pb-6">
            All{' '}
            <span className="underline decoration-green-500">type-safe</span>,
            with client-side + server-side{' '}
            <span className="underline decoration-orange-500">validations</span>
            , <span className="underline decoration-blue-500">pending UI</span>,
            and{' '}
            <span className="underline decoration-yellow-500">
              focus management
            </span>
          </h2>
          <Form
            labels={{
              firstName: 'First name',
              email: 'E-mail',
              source: 'How did you find out about us?',
            }}
            options={{ source: sources }}
            schema={schema}
            errors={data?.errors}
            values={data?.values}
          />
        </div>
      </div>
      <dl className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-x-8 md:gap-y-8">
        <Feature icon={BeakerIcon} title="100% customizable UI">
          Create custom inputs and use the default UI for everything else.
        </Feature>
        <Feature icon={ScaleIcon} title="Single source of truth">
          Write your schema once and derive everything else from it.
        </Feature>
        <Feature icon={ShieldCheckIcon} title="Bulletproof DX">
          100% typed to your schema. Goodbye typos, hello autocomplete!
        </Feature>
        <Feature icon={CloudIcon} title="Server-side action">
          Perform secure server-side mutations with zero boilerplate.
        </Feature>
        <Feature icon={ClipboardCheckIcon} title="Fullstack validation">
          Validate everything both on the client and the server.
        </Feature>
        <Feature icon={CursorClickIcon} title="Focus management">
          Focus on the first field with error even for server-side failures.
        </Feature>
      </dl>
      <div className="flex justify-center">
        <ButtonLink to="/get-started">Get Started</ButtonLink>
      </div>
    </div>
  )
}
