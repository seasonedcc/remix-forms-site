import hljs from 'highlight.js/lib/common'
import { LoaderFunction, useLoaderData } from 'remix'

const code = `import { ActionFunction, useActionData } from 'remix'
import { formAction, Form, Mutation } from 'remix-forms'
import { z } from 'zod'

const registerSchema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
})

const register: Mutation<typeof registerSchema> = async (values) => {
  console.log(values)
}

export const action: ActionFunction = async ({ request }) => {
  return await formAction({
    request,
    schema: registerSchema,
    mutation: register,
    successPath: '/?success=true',
  })
}

export default function Minimal() {
  const data = useActionData()

  return (
    <Form
      schema={registerSchema}
      errors={data?.errors}
      values={data?.values}
    />
  )
}`

export const loader: LoaderFunction = () => ({
  html: hljs.highlight(code, { language: 'ts' }).value,
})

export default function Index() {
  const { html } = useLoaderData()

  return (
    <div className="relative">
      <h1 className="text-center text-2xl font-bold leading-7 text-pink-500 sm:text-5xl pb-8 sm:pb-18 sm:pt-8">
        Magically create forms
        <br />+ actions in Remix
      </h1>
      <pre
        className="bg-black text-white p-2 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
