import { ActionFunction, useActionData } from 'remix'
import { formAction, Mutation } from 'remix-forms'
import { z } from 'zod'
import Form from '~/ui/form'

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
    <Form schema={registerSchema} errors={data?.errors} values={data?.values} />
  )
}
