import { test, expect } from '@playwright/test'

test('With JS enabled', async ({ page }) => {
  await page.goto('/examples/actions/custom-response')

  // Render
  const firstNameInput = page.locator('input[name="firstName"]').first()
  const firstNameLabel = page.locator('label[for="firstName"]').first()
  const emailInput = page.locator('input[name="email"]').first()
  const emailLabel = page.locator('label[for="email"]').first()
  const submitButton = page.locator('form button:has-text("OK")').first()

  await expect(firstNameInput).toHaveAttribute('type', 'text')
  await expect(firstNameInput).toHaveValue('')
  await expect(firstNameInput).toHaveAttribute(
    'aria-labelledby',
    'label-for-firstName',
  )
  await expect(firstNameInput).toHaveAttribute('aria-required', 'true')
  await expect(firstNameInput).toHaveAttribute('aria-invalid', 'false')

  await expect(firstNameLabel).toHaveText('First Name')
  await expect(firstNameLabel).toHaveId('label-for-firstName')

  await expect(emailInput).toHaveAttribute('type', 'text')
  await expect(emailInput).toHaveValue('')
  await expect(emailInput).toHaveAttribute('aria-labelledby', 'label-for-email')
  await expect(emailInput).toHaveAttribute('aria-required', 'true')
  await expect(emailInput).toHaveAttribute('aria-invalid', 'false')

  await expect(emailLabel).toHaveText('Email')
  await expect(emailLabel).toHaveId('label-for-email')

  await expect(submitButton).toBeEnabled()

  // Client-side validation
  await submitButton.click()

  const firstNameErrors = page.locator('#errors-for-firstName').first()
  const emailErrors = page.locator('#errors-for-email').first()

  // Show field errors and focus on the first field
  await expect(firstNameErrors).toHaveText(
    'String must contain at least 1 character(s)',
  )
  await expect(firstNameErrors).toHaveAttribute('role', 'alert')
  await expect(firstNameInput).toHaveAttribute('aria-invalid', 'true')
  await expect(firstNameInput).toHaveAttribute(
    'aria-describedBy',
    'errors-for-firstName',
  )
  await expect(emailErrors).toHaveText(
    'String must contain at least 1 character(s)',
  )
  await expect(emailErrors).toHaveAttribute('role', 'alert')
  await expect(emailInput).toHaveAttribute('aria-invalid', 'true')
  await expect(emailInput).toHaveAttribute(
    'aria-describedBy',
    'errors-for-email',
  )
  await expect(firstNameInput).toBeFocused()

  // Make first field be valid, focus goes to the second field
  await firstNameInput.fill('John')
  await submitButton.click()
  await expect(firstNameInput).toHaveAttribute('aria-invalid', 'false')
  await expect(emailInput).toBeFocused()

  // Try another invalid message
  await emailInput.fill('john')
  await expect(page.locator('#errors-for-email')).toHaveText('Invalid email')
  await expect(emailInput).toHaveAttribute('aria-invalid', 'true')

  // Make form be valid
  await emailInput.fill('john@doe.com')
  await expect(emailInput).toHaveAttribute('aria-invalid', 'false')

  // Submit form
  await page.route('**/*', async (route) => {
    await new Promise((f) => setTimeout(f, 100))
    await route.continue()
  })

  submitButton.click()
  await expect(submitButton).toBeDisabled()

  const actionResult = await page
    .locator('#action-data > pre')
    .first()
    .innerText()

  await expect(actionResult).toContain('"customName": "John"')
})

test('With JS disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()

  await page.goto('/examples/actions/custom-response')

  const firstNameInput = page.locator('input[name="firstName"]').first()
  const emailInput = page.locator('input[name="email"]').first()
  const submitButton = page.locator('form button:has-text("OK")').first()

  // Server-side validation
  await submitButton.click()

  await page.reload()

  const firstNameErrors = page.locator('#errors-for-firstName').first()

  // Show field errors and focus on the first field
  await expect(firstNameErrors).toHaveText(
    'String must contain at least 1 character(s)',
  )
  await expect(firstNameErrors).toHaveAttribute('role', 'alert')
  await expect(firstNameInput).toHaveAttribute('aria-invalid', 'true')
  await expect(firstNameInput).toHaveAttribute(
    'aria-describedBy',
    'errors-for-firstName',
  )

  const emailErrors = page.locator('#errors-for-email').first()
  const emailErrorDivs = await emailErrors.locator('div')
  await expect(emailErrorDivs.first()).toHaveText(
    'String must contain at least 1 character(s)',
  )
  await expect(emailErrorDivs.last()).toHaveText('Invalid email')
  await expect(emailErrors).toHaveAttribute('role', 'alert')
  await expect(emailInput).toHaveAttribute('aria-invalid', 'true')
  await expect(emailInput).toHaveAttribute(
    'aria-describedBy',
    'errors-for-email',
  )

  await expect(await firstNameInput.getAttribute('autofocus')).not.toBeNull()
  await expect(await emailInput.getAttribute('autofocus')).toBeNull()

  // Make first field be valid, focus goes to the second field
  await firstNameInput.fill('John')
  await submitButton.click()

  await page.reload()

  await expect(firstNameInput).toHaveAttribute('aria-invalid', 'false')

  await expect(await firstNameInput.getAttribute('autofocus')).toBeNull()
  await expect(await emailInput.getAttribute('autofocus')).not.toBeNull()

  // Try another invalid message
  await emailInput.fill('john')
  await submitButton.click()

  await page.reload()

  await expect(emailErrors).toHaveText('Invalid email')
  await expect(emailInput).toHaveAttribute('aria-invalid', 'true')

  // Make form be valid and test selecting an option
  await emailInput.fill('john@doe.com')

  // Submit form
  await submitButton.click()

  const actionResult = await page
    .locator('#action-data > pre')
    .first()
    .innerText()

  await expect(actionResult).toContain('"customName": "John"')
})
