import { test, expect } from '@playwright/test'

test.describe('Home page form', () => {
  test.describe('when empty', () => {
    test('shows the correct errors', async ({ page }) => {
      await page.goto('/')

      await page.locator('text=OK').click()

      await expect(page.locator('input[name="firstName"] ~div')).toHaveText(
        'String must contain at least 1 character(s)',
      )
      await expect(page.locator('input[name="firstName"]')).toBeFocused()
      await expect(page.locator('input[name="email"] ~div')).toHaveText(
        'String must contain at least 1 character(s)',
      )
    })
  })
})
