import hljs from 'highlight.js/lib/common'
import {
  ActionFunction,
  useActionData,
  LoaderFunction,
  useLoaderData,
} from 'remix'
import { formAction, Mutation } from 'remix-forms'
import { z } from 'zod'
import Form from '~/ui/form'
import {
  BeakerIcon,
  ScaleIcon,
  ShieldCheckIcon,
  CloudIcon,
  BadgeCheckIcon,
  CursorClickIcon,
} from '@heroicons/react/solid'
import Feature from '~/ui/feature'

const code = `import { ActionFunction, useActionData, LoaderFunction, useLoaderData } from 'remix'
import { formAction, Form, Mutation } from 'remix-forms'
import { z } from 'zod'

const schema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
  source: z.string().nonempty(),
})

const register: Mutation<typeof schema> = async (values) => {
  console.log(values)
}

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
    mutation: register,
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

const register: Mutation<typeof schema> = async (values) => {
  console.log(values)
}

export const action: ActionFunction = async ({ request }) =>
  await formAction({
    request,
    schema,
    mutation: register,
    successPath: '/?success=true',
  })

export const loader: LoaderFunction = () => ({
  html: hljs.highlight(code, { language: 'ts' }).value,
  sources: [
    { name: 'From a friend', value: 'friend' },
    { name: 'Google', value: 'google' },
  ],
})

export default function Index() {
  const { html, sources } = useLoaderData()
  const data = useActionData()

  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-center text-2xl font-bold leading-7 text-pink-500 sm:text-5xl pb-8 sm:pt-8">
        Magically create forms
        <br />+ actions in Remix
      </h1>
      <div className="flex flex-col space-y-6 space-x-0 xl:flex-row xl:space-x-6 xl:space-y-0">
        <pre
          className="xl:flex-1 bg-black text-white p-2 overflow-auto max-h-[60vh] text-xs sm:text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
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
      <dl className="pt-8 space-y-8 md:space-y-0 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-x-8 md:gap-y-8">
        <Feature icon={BeakerIcon} title="100% customizable UI">
          Create custom inputs and use the default UI for everything else.
        </Feature>
        <Feature icon={ScaleIcon} title="Single source of truth">
          Write your schema once and derive everything else from it.
        </Feature>
        <Feature icon={ShieldCheckIcon} title="Bulletproof DX">
          Everything is typed. Goodbye typos, hello beautiful autocomplete!
        </Feature>
        <Feature icon={CloudIcon} title="Server-side action">
          Perform secure server-side mutations with zero boilerplate.
        </Feature>
        <Feature icon={BadgeCheckIcon} title="Fullstack validation">
          Validate everything both on the client and the server.
        </Feature>
        <Feature icon={CursorClickIcon} title="Focus management">
          Focus on the first field with error even for server-side failures.
        </Feature>
      </dl>
    </div>
  )
}
