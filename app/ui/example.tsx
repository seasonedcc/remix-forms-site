import { useEffect } from 'react'
import { useActionData, useLoaderData } from '@remix-run/react'
import Code from '~/ui/code'
import Heading from '~/ui/heading'
import SubHeading from '~/ui/sub-heading'

type Props = {
  title: React.ReactNode
  description: React.ReactNode
  children: React.ReactNode
}

export default function Example({ title, description, children }: Props) {
  const { code } = useLoaderData()
  const actionData = useActionData()
  const data = actionData?.errors ? null : actionData

  useEffect(() => {
    if (!data) return

    const element = document.querySelector('#action-data')
    element?.scrollIntoView({ behavior: 'smooth' })
  }, [data])

  return (
    <>
      <Heading>{title}</Heading>
      <SubHeading>{description}</SubHeading>
      <div className="flex flex-col space-y-6 space-x-0 xl:flex-row xl:space-x-6 xl:space-y-0">
        <Code>{code}</Code>
        <div className="xl:flex-1">{children}</div>
      </div>
      {data ? (
        <div id="action-data" className="flex flex-col space-y-4">
          <h4>
            This data was returned by our <em>action</em>. We got it by calling{' '}
            <em>useActionData()</em> inside our component.
          </h4>
          <Code>{JSON.stringify(data, null, 2)}</Code>
        </div>
      ) : null}
    </>
  )
}
