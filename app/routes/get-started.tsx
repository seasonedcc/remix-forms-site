import hljs from 'highlight.js/lib/common'
import { LoaderFunction, useLoaderData } from 'remix'
import Code from '~/ui/code'
import ExternalLink from '~/ui/external-link'
import Heading from '~/ui/heading'
import Pre from '~/ui/pre'
import SubHeading from '~/ui/sub-heading'

const code = `import { Form as RemixForm, FormProps } from 'remix-forms'
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

export const loader: LoaderFunction = () => ({
  html: hljs.highlight(code, { language: 'ts' }).value,
})

export default function GetStarted() {
  const { html } = useLoaderData()

  return (
    <div className="flex flex-col space-y-8 max-w-xl m-auto text-gray-200">
      <Heading>Get Started</Heading>
      <SubHeading>Dependencies</SubHeading>
      <p>
        Make sure you have{' '}
        <ExternalLink href="https://remix.run/" className="underline">
          Remix
        </ExternalLink>{' '}
        and{' '}
        <ExternalLink
          href="https://github.com/colinhacks/zod"
          className="underline"
        >
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
      <Code>{html}</Code>
      <div className="flex flex-col space-y-2">
        <p>
          From now on, use your <em>Form</em> component, instead of Remix
          Forms'.
        </p>
        <p>
          PS: you don't need to customize everything. We'll use standard html
          tags if you don't.
        </p>
      </div>
    </div>
  )
}
