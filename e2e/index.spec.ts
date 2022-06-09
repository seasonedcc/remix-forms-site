import { test, expect } from '@playwright/test'

test.describe('Home page form', () => {
  test.describe('Render', () => {
    test('renders the correct input types', async ({ page }) => {
      await page.goto('/')

      await expect(page.locator('input[name="firstName"]')).toHaveAttribute(
        'type',
        'text',
      )
      await expect(page.locator('label[for="firstName"]')).toHaveText(
        'First Name',
      )
      await expect(page.locator('input[name="firstName"]')).toHaveValue('')
      await expect(page.locator('input[name="email"]')).toHaveAttribute(
        'type',
        'text',
      )
      await expect(page.locator('label[for="email"]')).toHaveText('Email')
      await expect(page.locator('input[name="email"]')).toHaveValue('')
      await expect(
        page.locator('label[for="howYouFoundOutAboutUs"]'),
      ).toHaveText('How You Found Out About Us')

      await expect(
        page.locator('select[name="howYouFoundOutAboutUs"]'),
      ).toHaveValue('fromAFriend')

      const options = page.locator(
        'select[name="howYouFoundOutAboutUs"] > option',
      )

      await expect(options.nth(0)).toHaveText('From A Friend')
      await expect(options.nth(1)).toHaveText('Google')
    })
  })

  test.describe('Client-side validation', () => {
    test('shows the correct errors', async ({ page }) => {
      await page.goto('/')

      await page.locator('button:has-text("OK")').click()

      await expect(page.locator('input[name="firstName"] ~div')).toHaveText(
        'String must contain at least 1 character(s)',
      )
      await expect(page.locator('input[name="firstName"]')).toBeFocused()
      await expect(page.locator('input[name="email"] ~div')).toHaveText(
        'String must contain at least 1 character(s)',
      )

      await page.locator('input[name="firstName"]').type('John')
      await page.locator('button:has-text("OK")').click()
      await expect(page.locator('input[name="email"]')).toBeFocused()

      await page.locator('input[name="email"]').type('john')
      await expect(page.locator('input[name="email"] ~div')).toHaveText(
        'Invalid email',
      )
    })
  })

  test.describe('Submit', () => {
    test('submits the form and redirects', async ({ page }) => {
      await page.goto('/')

      await page.locator('input[name="firstName"]').type('John')
      await page.locator('input[name="email"]').type('john@doe.com')

      await page.locator('button:has-text("OK")').click()

      await expect(page).toHaveURL('/success')
    })
  })
})
