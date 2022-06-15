import { test, testWithoutJS, expect } from 'tests/setup/tests'

const route = '/examples/schemas/booleans'

test('With JS enabled', async ({ example }) => {
  const { button, page } = example
  const mandatory = example.field('mandatory')
  const optional = example.field('optional')
  const nullable = example.field('nullable')
  const defaultFalse = example.field('defaultFalse')
  const defaultTrue = example.field('defaultTrue')

  await page.goto(route)

  // Render
  await example.expectField(mandatory, { value: 'on', type: 'checkbox' })
  await example.expectField(optional, {
    value: 'on',
    required: false,
    type: 'checkbox',
  })
  await example.expectField(nullable, {
    value: 'on',
    required: false,
    type: 'checkbox',
  })
  await example.expectField(defaultFalse, { value: 'on', type: 'checkbox' })
  await example.expectField(defaultTrue, { value: 'on', type: 'checkbox' })

  // Submit
  await expect(button).toBeEnabled()
  await button.click()

  const actionResult = await page
    .locator('#action-data > pre:visible')
    .innerText()

  await expect(actionResult).toContain('"mandatory": false')
  await expect(actionResult).toContain('"nullable": null')
  await expect(actionResult).toContain('"defaultFalse": false')
  await expect(actionResult).toContain('"defaultTrue": true')

  await page.reload()

  await mandatory.input.check()
  await optional.input.check()
  await nullable.input.check()
  await defaultFalse.input.check()
  await defaultTrue.input.uncheck()

  await button.click()

  const secondActionResult = await page
    .locator('#action-data > pre:visible')
    .innerText()

  await expect(secondActionResult).toContain('"mandatory": true')
  await expect(secondActionResult).toContain('"optional": true')
  await expect(secondActionResult).toContain('"nullable": true')
  await expect(secondActionResult).toContain('"defaultFalse": true')
  await expect(secondActionResult).toContain('"defaultTrue": false')
})

testWithoutJS('With JS disabled', async ({ example }) => {
  const { button, page } = example
  const mandatory = example.field('mandatory')
  const optional = example.field('optional')
  const nullable = example.field('nullable')
  const defaultFalse = example.field('defaultFalse')
  const defaultTrue = example.field('defaultTrue')

  await page.goto(route)

  // Submit
  await expect(button).toBeEnabled()
  await button.click()

  const actionResult = await page
    .locator('#action-data > pre:visible')
    .innerText()

  await expect(actionResult).toContain('"mandatory": false')
  await expect(actionResult).toContain('"nullable": null')
  await expect(actionResult).toContain('"defaultFalse": false')
  await expect(actionResult).toContain('"defaultTrue": true')

  await page.reload()

  await mandatory.input.check()
  await optional.input.check()
  await nullable.input.check()
  await defaultFalse.input.check()
  await defaultTrue.input.uncheck()

  await button.click()

  const secondActionResult = await page
    .locator('#action-data > pre:visible')
    .innerText()

  await expect(secondActionResult).toContain('"mandatory": true')
  await expect(secondActionResult).toContain('"optional": true')
  await expect(secondActionResult).toContain('"nullable": true')
  await expect(secondActionResult).toContain('"defaultFalse": true')
  await expect(secondActionResult).toContain('"defaultTrue": false')
})
