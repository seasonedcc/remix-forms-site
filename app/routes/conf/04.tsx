import hljs from 'highlight.js/lib/common'
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from '@remix-run/node'
import { metaTags } from '~/helpers'
import Example from '~/ui/example'
import Input from '~/ui/input'
import Label from '~/ui/conf/label'
import Button from '~/ui/submit-button'
import Select from '~/ui/select'
import TextArea from '~/ui/text-area'
import { Form, useActionData, useSubmit } from '@remix-run/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const title = 'Client validations'
const description =
  "Now let's add client-side validations. We'll use the amazing react-hook-form for that."

export const meta: MetaFunction = () => metaTags({ title, description })

const code = `import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

function parseDate(value: unknown) {
  const [year, month, day] = String(value).split('-').map(Number)
  return new Date(year, month - 1, day)
}

const reservationSchema = z.object({
  city: z.enum(['saltLakeCity', 'lasVegas', 'losAngeles']),
  checkIn: z.preprocess(parseDate, z.date()),
  checkOut: z.preprocess(parseDate, z.date()),
  adults: z.preprocess(Number, z.number().int().positive()),
  children: z.preprocess(Number, z.number().int().positive()),
  bedrooms: z.preprocess(Number, z.number().int().positive()),
  specialRequests: z.string().optional(),
})

async function makeReservation(values: z.infer<typeof reservationSchema>) {
  // Here you would store data istead
  console.log(values)
}

type ActionData = { errors: z.ZodIssue[] }

export const action: ActionFunction = async ({ request }) => {
  const formValues = Object.fromEntries(await request.formData())
  const result = reservationSchema.safeParse(formValues)

  if (result.success) {
    await makeReservation(result.data)
    return redirect('/success')
  }

  return json<ActionData>({ errors: result.error.issues })
}

function Error(props: JSX.IntrinsicElements['div']) {
  return <div {...props} className="mt-1 text-red-500" />
}

function renderServerError(name: string) {
  const errors = useActionData<ActionData>()?.errors
  const message = errors?.find(({ path }) => path[0] === name)?.message

  if (!message) return null

  return <Error>{message}</Error>
}

function renderClientError(name: string, errors: any) {
  const message = errors[name]?.message

  if (!message) return null

  return <Error>{message}</Error>
}

function renderError(name: string, errors: any) {
  const clientError = renderClientError(name, errors)

  if (clientError) return clientError

  return renderServerError(name)
}

export default function Component() {
  const resolver = zodResolver(reservationSchema)
  const { register, handleSubmit, formState } = useForm({ resolver })
  const { errors } = formState
  const submit = useSubmit()

  return (
    <Form
      method="post"
      className="flex flex-col space-y-4"
      onSubmit={(event: any) => {
        handleSubmit(() => submit(event.target))(event)
      }}
    >
      <div>
        <Label htmlFor="city">City</Label>
        <Select {...register('city')} id="city">
          <option value="saltLakeCity">Salt Lake City</option>
          <option value="lasVegas">Las Vegas</option>
          <option value="losAngeles">Los Angeles</option>
        </Select>
        {renderError('city', errors)}
      </div>
      <div className="flex w-full space-x-4">
        <div className="flex-1">
          <Label htmlFor="checkIn">Check In</Label>
          <Input {...register('checkIn')} id="checkIn" type="date" />
          {renderError('checkIn', errors)}
        </div>
        <div className="flex-1">
          <Label htmlFor="checkOut">Check Out</Label>
          <Input {...register('checkOut')} id="checkOut" type="date" />
          {renderError('checkOut', errors)}
        </div>
      </div>
      <div className="flex w-full space-x-4">
        <div className="flex-1">
          <Label htmlFor="adults">Adults</Label>
          <Input {...register('adults')} id="adults" />
          {renderError('adults', errors)}
        </div>
        <div className="flex-1">
          <Label htmlFor="children">Children</Label>
          <Input {...register('children')} id="children" />
          {renderError('children', errors)}
        </div>
        <div className="flex-1">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input {...register('bedrooms')} id="bedrooms" />
          {renderError('bedrooms', errors)}
        </div>
      </div>
      <div>
        <Label htmlFor="specialRequests">Special Requests</Label>
        <TextArea {...register('specialRequests')} id="specialRequests" />
        {renderError('specialRequests', errors)}
      </div>
      <Button>Make reservation</Button>
    </Form>
  )
}
`

export const loader: LoaderFunction = () => ({
  code: hljs.highlight(code, { language: 'ts' }).value,
})

function parseDate(value: unknown) {
  const [year, month, day] = String(value).split('-').map(Number)
  return new Date(year, month - 1, day)
}

const reservationSchema = z.object({
  city: z.enum(['saltLakeCity', 'lasVegas', 'losAngeles']),
  checkIn: z.preprocess(parseDate, z.date()),
  checkOut: z.preprocess(parseDate, z.date()),
  adults: z.preprocess(Number, z.number().int().positive()),
  children: z.preprocess(Number, z.number().int().positive()),
  bedrooms: z.preprocess(Number, z.number().int().positive()),
  specialRequests: z.string().optional(),
})

async function makeReservation(values: z.infer<typeof reservationSchema>) {
  // Here you would store data istead
  console.log(values)
}

type ActionData = { errors: z.ZodIssue[] }

export const action: ActionFunction = async ({ request }) => {
  const formValues = Object.fromEntries(await request.formData())
  const result = reservationSchema.safeParse(formValues)

  if (result.success) {
    await makeReservation(result.data)
    return redirect('/success')
  }

  return json<ActionData>({ errors: result.error.issues })
}

function Error(props: JSX.IntrinsicElements['div']) {
  return <div {...props} className="mt-1 text-red-500" />
}

function renderServerError(name: string) {
  const errors = useActionData<ActionData>()?.errors
  const message = errors?.find(({ path }) => path[0] === name)?.message

  if (!message) return null

  return <Error>{message}</Error>
}

function renderClientError(name: string, errors: any) {
  const message = errors[name]?.message

  if (!message) return null

  return <Error>{message}</Error>
}

function renderError(name: string, errors: any) {
  const clientError = renderClientError(name, errors)

  if (clientError) return clientError

  return renderServerError(name)
}

export default function Component() {
  const resolver = zodResolver(reservationSchema)
  const { register, handleSubmit, formState } = useForm({ resolver })
  const { errors } = formState
  const submit = useSubmit()

  return (
    <Example title={title} description={description}>
      <Form
        method="post"
        className="flex flex-col space-y-4"
        onSubmit={(event: any) => {
          handleSubmit(() => submit(event.target))(event)
        }}
      >
        <div>
          <Label htmlFor="city">City</Label>
          <Select {...register('city')} id="city">
            <option value="saltLakeCity">Salt Lake City</option>
            <option value="lasVegas">Las Vegas</option>
            <option value="losAngeles">Los Angeles</option>
          </Select>
          {renderError('city', errors)}
        </div>
        <div className="flex w-full space-x-4">
          <div className="flex-1">
            <Label htmlFor="checkIn">Check In</Label>
            <Input {...register('checkIn')} id="checkIn" type="date" />
            {renderError('checkIn', errors)}
          </div>
          <div className="flex-1">
            <Label htmlFor="checkOut">Check Out</Label>
            <Input {...register('checkOut')} id="checkOut" type="date" />
            {renderError('checkOut', errors)}
          </div>
        </div>
        <div className="flex w-full space-x-4">
          <div className="flex-1">
            <Label htmlFor="adults">Adults</Label>
            <Input {...register('adults')} id="adults" />
            {renderError('adults', errors)}
          </div>
          <div className="flex-1">
            <Label htmlFor="children">Children</Label>
            <Input {...register('children')} id="children" />
            {renderError('children', errors)}
          </div>
          <div className="flex-1">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input {...register('bedrooms')} id="bedrooms" />
            {renderError('bedrooms', errors)}
          </div>
        </div>
        <div>
          <Label htmlFor="specialRequests">Special Requests</Label>
          <TextArea {...register('specialRequests')} id="specialRequests" />
          {renderError('specialRequests', errors)}
        </div>
        <Button>Make reservation</Button>
      </Form>
    </Example>
  )
}
