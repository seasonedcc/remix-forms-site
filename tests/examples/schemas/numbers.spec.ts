import { test, testWithoutJS, expect } from 'tests/setup/tests'

const route = '/examples/schemas/numbers'

test('With JS enabled', async ({ example }) => {
  const { button, page } = example
  const mandatory = example.field('mandatory')
  const optional = example.field('optional')
  const nullable = example.field('nullable')
  const defaultRandom = example.field('defaultRandom')
  const greaterThan = example.field('greaterThan')
  const greaterThanOrEqualTo = example.field('greaterThanOrEqualTo')
  const lowerThan = example.field('lowerThan')
  const lowerThanOrEqualTo = example.field('lowerThanOrEqualTo')
  const integer = example.field('integer')

  await page.goto(route)

  // Render
  await example.expectField(mandatory)
  await example.expectField(optional, { required: false })
  await example.expectField(nullable, { required: false })
  await example.expectField(defaultRandom, { value: /\d/ })
  await example.expectField(greaterThan)
  await example.expectField(greaterThanOrEqualTo)
  await example.expectField(lowerThan)
  await example.expectField(lowerThanOrEqualTo)
  await example.expectField(integer)

  await expect(button).toBeEnabled()

  // Client-side validation

  await button.click()

  // Show field errors and focus on the first field
  await example.expectError(mandatory, 'Expected number, received null')
  await example.expectValid(optional)
  await example.expectValid(nullable)

  await example.expectError(greaterThan, 'Expected number, received null')
  await example.expectError(
    greaterThanOrEqualTo,
    'Expected number, received null',
  )
  await example.expectError(lowerThan, 'Expected number, received null')
  await example.expectError(
    lowerThanOrEqualTo,
    'Expected number, received null',
  )
  await example.expectError(integer, 'Expected number, received null')

  await expect(mandatory.input).toBeFocused()

  // Test other errors
  await greaterThan.input.fill('4')
  await greaterThanOrEqualTo.input.fill('4')
  await lowerThan.input.fill('11')
  await lowerThanOrEqualTo.input.fill('11')

  await example.expectError(greaterThan, 'Number must be greater than 5')
  await example.expectError(
    greaterThanOrEqualTo,
    'Number must be greater than or equal to 10',
  )
  await example.expectError(lowerThan, 'Number must be less than 5')
  await example.expectError(
    lowerThanOrEqualTo,
    'Number must be less than or equal to 10',
  )

  // Make first field be valid, focus goes to the second field
  await mandatory.input.fill('1')
  await button.click()
  await example.expectValid(mandatory)
  await expect(greaterThan.input).toBeFocused()

  await greaterThan.input.fill('6')
  await button.click()
  await example.expectValid(greaterThan)
  await expect(greaterThanOrEqualTo.input).toBeFocused()

  await greaterThanOrEqualTo.input.fill('10')
  await button.click()
  await example.expectValid(greaterThanOrEqualTo)
  await expect(lowerThan.input).toBeFocused()

  await lowerThan.input.fill('4')
  await button.click()
  await example.expectValid(lowerThan)
  await expect(lowerThanOrEqualTo.input).toBeFocused()

  await lowerThanOrEqualTo.input.fill('10')
  await button.click()
  await example.expectValid(lowerThanOrEqualTo)
  await expect(integer.input).toBeFocused()

  await integer.input.fill('4')
  await example.expectValid(integer)

  // Submit form

  await optional.input.fill('5')

  await button.click()
  await expect(button).toBeDisabled()

  const actionResult = await page
    .locator('#action-data > pre:visible')
    .innerText()

  await expect(actionResult).toContain('"mandatory": 1')
  await expect(actionResult).toContain('"nullable": null')
  await expect(actionResult).toContain('"defaultRandom":')
  await expect(actionResult).toContain('"greaterThan": 6')
  await expect(actionResult).toContain('"greaterThanOrEqualTo": 10')
  await expect(actionResult).toContain('"lowerThan": 4')
  await expect(actionResult).toContain('"lowerThanOrEqualTo": 10')
  await expect(actionResult).toContain('"integer": 4')
  await expect(actionResult).toContain('"optional": 5')
})

testWithoutJS('With JS disabled', async ({ example }) => {
  // const { email, button, page } = example
  // const nonEmpty = example.field('nonEmpty')
  // const minLength = example.field('minLength')
  // const maxLength = example.field('maxLength')
  // const url = example.field('url')
  // const phoneNumber = example.field('phoneNumber')
  // await page.goto(route)
  // // Server-side validation
  // maxLength.input.fill('abcdefghijk')
  // await button.click()
  // await page.reload()
  // // Show field errors and focus on the first field
  // await example.expectError(
  //   nonEmpty,
  //   'String must contain at least 1 character(s)',
  // )
  // await example.expectError(
  //   minLength,
  //   'String must contain at least 5 character(s)',
  // )
  // await example.expectError(
  //   maxLength,
  //   'String must contain at most 10 character(s)',
  // )
  // await example.expectError(email, 'Invalid email')
  // await example.expectError(url, 'Invalid url')
  // await example.expectError(phoneNumber, 'Invalid phone number')
  // await expect(nonEmpty.input).toBeFocused()
  // // Make first field be valid, focus goes to the second field
  // await nonEmpty.input.fill('John')
  // await button.click()
  // await page.reload()
  // await example.expectValid(nonEmpty)
  // await expect(minLength.input).toBeFocused()
  // await minLength.input.fill('abcde')
  // await button.click()
  // await page.reload()
  // await example.expectValid(minLength)
  // await expect(maxLength.input).toBeFocused()
  // await maxLength.input.fill('abcde')
  // await button.click()
  // await page.reload()
  // await example.expectValid(maxLength)
  // await expect(email.input).toBeFocused()
  // await email.input.fill('john@doe.com')
  // await button.click()
  // await page.reload()
  // await example.expectValid(email)
  // await expect(url.input).toBeFocused()
  // await url.input.fill('http://example.com')
  // await button.click()
  // await page.reload()
  // await example.expectValid(url)
  // await expect(phoneNumber.input).toBeFocused()
  // // Make form be valid
  // await phoneNumber.input.fill('5551234567')
  // // Submit form
  // await button.click()
  // await page.reload()
  // await example.expectValid(phoneNumber)
  // const actionResult = await page
  //   .locator('#action-data > pre:visible')
  //   .innerText()
  // await expect(actionResult).toContain('"nonEmpty": "John"')
  // await expect(actionResult).toContain('"nullable": null')
  // await expect(actionResult).toContain('"default": "Foo Bar"')
  // await expect(actionResult).toContain('"minLength": "abcde"')
  // await expect(actionResult).toContain('"maxLength": "abcde"')
  // await expect(actionResult).toContain('"email": "john@doe.com"')
  // await expect(actionResult).toContain('"url": "http://example.com"')
  // await expect(actionResult).toContain('"phoneNumber": "5551234567"')
})
