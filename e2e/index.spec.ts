import { test, expect } from '@playwright/test'

test.describe('Home page form', () => {
  test('with JS enabled', async ({ page }) => {
    await page.goto('/')

    // Render
    const firstNameInput = page.locator('input[name="firstName"]')
    const firstNameLabel = page.locator('label[for="firstName"]')
    const emailInput = page.locator('input[name="email"]')
    const emailLabel = page.locator('label[for="email"]')
    const selectInput = page.locator('select[name="howYouFoundOutAboutUs"]')
    const selectLabel = page.locator('label[for="howYouFoundOutAboutUs"]')
    const submitButton = page.locator('form button:has-text("OK")')

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
    await expect(emailInput).toHaveAttribute(
      'aria-labelledby',
      'label-for-email',
    )
    await expect(emailInput).toHaveAttribute('aria-required', 'true')
    await expect(emailInput).toHaveAttribute('aria-invalid', 'false')

    await expect(emailLabel).toHaveText('Email')
    await expect(emailLabel).toHaveId('label-for-email')

    await expect(selectInput).toHaveValue('fromAFriend')
    await expect(selectInput).toHaveAttribute(
      'aria-labelledby',
      'label-for-howYouFoundOutAboutUs',
    )
    await expect(selectInput).toHaveAttribute('aria-required', 'true')
    await expect(selectInput).toHaveAttribute('aria-invalid', 'false')

    await expect(selectLabel).toHaveText('How You Found Out About Us')
    await expect(selectLabel).toHaveId('label-for-howYouFoundOutAboutUs')

    await expect(selectInput.locator('option').first()).toHaveText(
      'From A Friend',
    )
    await expect(selectInput.locator('option').last()).toHaveText('Google')

    await expect(submitButton).toBeEnabled()

    // Client-side validation
    await submitButton.click()

    // Show field errors and focus on the first field
    await expect(page.locator('#errors-for-firstName')).toHaveText(
      'String must contain at least 1 character(s)',
    )
    await expect(page.locator('#errors-for-firstName')).toHaveAttribute(
      'role',
      'alert',
    )
    await expect(firstNameInput).toHaveAttribute('aria-invalid', 'true')
    await expect(firstNameInput).toHaveAttribute(
      'aria-describedBy',
      'errors-for-firstName',
    )
    await expect(page.locator('#errors-for-email')).toHaveText(
      'String must contain at least 1 character(s)',
    )
    await expect(page.locator('#errors-for-email')).toHaveAttribute(
      'role',
      'alert',
    )
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

    await selectInput.selectOption('google')

    // Submit form
    await page.route('**/*', async (route) => {
      await new Promise((f) => setTimeout(f, 50))
      await route.continue()
    })

    submitButton.click()
    await expect(submitButton).toBeDisabled()
    await expect(page).toHaveURL('/success')
  })
})

test.describe('With JS disabled', () => {
  test('renders the correct input names, types, labels and values', async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()

    await page.goto('/')

    const firstNameInput = page.locator('input[name="firstName"]')
    const emailInput = page.locator('input[name="email"]')
    const selectInput = page.locator('select[name="howYouFoundOutAboutUs"]')
    const submitButton = page.locator('form button:has-text("OK")')

    // Server-side validation
    await submitButton.click()

    // Show field errors and focus on the first field
    await expect(page.locator('#errors-for-firstName')).toHaveText(
      'String must contain at least 1 character(s)',
    )
    await expect(page.locator('#errors-for-firstName')).toHaveAttribute(
      'role',
      'alert',
    )
    await expect(firstNameInput).toHaveAttribute('aria-invalid', 'true')
    await expect(firstNameInput).toHaveAttribute(
      'aria-describedBy',
      'errors-for-firstName',
    )

    await expect(page.locator('#errors-for-email')).toHaveText(
      'String must contain at least 1 character(s)Invalid email',
    )
    await expect(page.locator('#errors-for-email')).toHaveAttribute(
      'role',
      'alert',
    )
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
    await submitButton.click()

    await expect(page.locator('#errors-for-email')).toHaveText('Invalid email')
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true')

    // Make form be valid and test selecting an option
    await emailInput.fill('john@doe.com')
    await selectInput.selectOption('google')

    // Submit form
    submitButton.click()
    await expect(page).toHaveURL('/success')
  })
})
