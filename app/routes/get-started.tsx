import hljs from 'highlight.js/lib/common'
import { LoaderFunction, useLoaderData } from 'remix'
import Code from '~/ui/code'
import ExternalLink from '~/ui/external-link'
import Heading from '~/ui/heading'
import Pre from '~/ui/pre'
import SubHeading from '~/ui/sub-heading'

const formCode = `import { Form as RemixForm, FormProps } from 'remix-forms'
import { SomeZodObject } from 'zod'

export default function Form<Schema extends SomeZodObject>(
  props: FormProps<Schema>,
) {
  return (
    <RemixForm<Schema>
      className={/* your form classes */}
      fieldComponent={/* your custom Field */}
      labelComponent={/* your custom Label */}
      inputComponent={/* your custom Input */}
      selectComponent={/* your custom Select */}
      buttonComponent={/* your custom Button */}
      fieldErrorsComponent={/* your custom FieldErrors */}
      globalErrorsComponent={/* your custom GlobalErrors */}
      errorComponent={/* your custom Error */}
      {...props}
    />
  )
}`

const schemaCode = `const schema = z.object({
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
})`

const actionCode = `export const action: ActionFunction = async ({ request }) =>
  await formAction({
    request,
    schema,
    mutation: async (values) => { /* mutate things here */ },
    successPath: /* path to redirect on success */,
  })`

const basicCode = `export default function GetStarted() {
  const data = useActionData()

  return (
    <Form
      labels={{ firstName: 'First name', email: 'E-mail' }}
      schema={schema}
      errors={data?.errors}
      values={data?.values}
    />
  )
}`

const customFormCode = `<Form schema={schema} errors={data?.errors} values={data?.values}>
  {({ Field, Errors, Button }) => (
    <>
      <Field name="firstName" label="First name" />
      <Field name="email" label="E-mail" />
      <em>You're going to hear from us at this address 👆🏽</em>
      <Errors />
      <Button />
    </>
  )}
</Form>`

const customFieldCode = `<Form schema={schema} errors={data?.errors} values={data?.values}>
  {({ Field, Errors, Button }) => (
    <>
      <Field name="firstName" label="First name" />
      <Field name="email">
        {({ Label, Input, Errors }) => (
          <>
            <Label>E-mail</Label>
            <em>You're going to hear from us at this address 👇🏽</em>
            <Input />
            <Errors />
          </>
        )}
      </Field>
      <Errors />
      <Button />
    </>
  )}
</Form>`

const customInputCode = `<Form schema={schema} errors={data?.errors} values={data?.values}>
  {({ Field, Errors, Button, register }) => (
    <>
      <Field name="firstName" label="First name" />
      <Field name="email" label="E-mail">
        {({ Label, Errors }) => (
          <>
            <Label />
            <input {...register('email')} />
            <Errors />
          </>
        )}
      </Field>
      <Errors />
      <Button />
    </>
  )}
</Form>`

export const loader: LoaderFunction = () => ({
  formCode: hljs.highlight(formCode, { language: 'ts' }).value,
  schemaCode: hljs.highlight(schemaCode, { language: 'ts' }).value,
  actionCode: hljs.highlight(actionCode, { language: 'ts' }).value,
  basicCode: hljs.highlight(basicCode, { language: 'ts' }).value,
  customFormCode: hljs.highlight(customFormCode, { language: 'ts' }).value,
  customFieldCode: hljs.highlight(customFieldCode, { language: 'ts' }).value,
  customInputCode: hljs.highlight(customInputCode, { language: 'ts' }).value,
})

export default function GetStarted() {
  const {
    formCode,
    schemaCode,
    actionCode,
    basicCode,
    customFormCode,
    customFieldCode,
    customInputCode,
  } = useLoaderData()

  return (
    <div className="flex flex-col space-y-8 max-w-xl m-auto text-gray-200">
      <Heading>Get Started</Heading>
      <SubHeading>Dependencies</SubHeading>
      <p>
        Make sure you have{' '}
        <ExternalLink href="https://remix.run/">Remix</ExternalLink> and{' '}
        <ExternalLink href="https://github.com/colinhacks/zod">
          Zod
        </ExternalLink>{' '}
        in your project before using Remix Forms.
      </p>
      <SubHeading>Installation</SubHeading>
      <Pre>npm install remix-forms</Pre>
      <SubHeading>Basic styles</SubHeading>
      <p>
        Remix Forms doesn't ship any styles, so you need to configure basic
        styles for your forms. Let's create a custom <em>Form</em> component for
        your project:
      </p>
      <Code>{formCode}</Code>
      <div className="flex flex-col space-y-2">
        <p>
          From now on, use your <em>Form</em> component instead of Remix Forms'.
        </p>
        <p>
          PS: you don't need to customize everything. We'll use standard html
          tags if you don't.
        </p>
      </div>
      <SubHeading>Write your schema</SubHeading>
      <p>
        Compose a zod schema that will be used in your action, mutation
        function, form generation, server-side validation, and client-side
        validation.
      </p>
      <Code>{schemaCode}</Code>
      <SubHeading>Create your action</SubHeading>
      <p>
        Remix Forms' <em>formAction</em> will parse the request's{' '}
        <em>formData</em> and call your mutation function only if everything is
        valid. If the mutation is successful, it will redirect to{' '}
        <em>successPath</em>. If not, it will return <em>errors</em> and{' '}
        <em>values</em> to pass to <em>Form</em>.
      </p>
      <Code>{actionCode}</Code>
      <SubHeading>Create a basic form</SubHeading>
      <p>
        If you don't want any custom inputs in the form, you can render{' '}
        <em>Form</em> without <em>children</em> and it will generate all the
        inputs, error messages and button for you.
      </p>
      <Code>{basicCode}</Code>
      <SubHeading>Custom Form, standard components</SubHeading>
      <p>
        If you want a custom UI for your form, but don't need to customize the
        rendering of fields, errors, and buttons, do it like this:
      </p>
      <Code>{customFormCode}</Code>
      <SubHeading>Custom Field, standard components</SubHeading>
      <p>
        If you want a custom UI for a specific field, but don't need to
        customize the rendering of the label, input/select, and errors, do this:
      </p>
      <Code>{customFieldCode}</Code>
      <SubHeading>100% custom input</SubHeading>
      <p>
        If you want a 100% custom input, you can access{' '}
        <ExternalLink href="https://react-hook-form.com/">
          React Hook Form
        </ExternalLink>
        's <em>register</em> (and everything else) through the <em>Form</em>'s{' '}
        <em>children</em> and go nuts:
      </p>
      <Code>{customInputCode}</Code>
      <SubHeading>That's it!</SubHeading>
      <div className="flex flex-col space-y-2">
        <p>
          Now go play! Keep in mind that we're just getting started and the APIs
          are unstable, so we appreciate your patience as we figure things out.
        </p>
        <p>
          Also, please join{' '}
          <ExternalLink href="https://rmx.as/discord">
            Remix's community on Discord
          </ExternalLink>
          . We'll be there to provide you support on Remix Forms.
        </p>
      </div>
      <SubHeading>Appreciation</SubHeading>
      <p>
        Remix Forms is a thin layer on top of giants. It wouldn't be possible
        without{' '}
        <ExternalLink href="https://www.typescriptlang.org/">
          TypeScript
        </ExternalLink>
        ,{' '}
        <ExternalLink href="https://react-hook-form.com/">
          React Hook Form
        </ExternalLink>
        , <ExternalLink href="https://remix.run/">Remix</ExternalLink>,{' '}
        <ExternalLink href="https://github.com/colinhacks/zod">
          Zod
        </ExternalLink>
        , and a multitude of other open-source projects. Thank you!
      </p>
    </div>
  )
}
