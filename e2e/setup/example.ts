import { Locator, Page, expect } from '@playwright/test'
import { startCase } from 'lodash/fp'

type Field = {
  name: string
  label: Locator
  input: Locator
}

type FieldOptions = {
  label?: string
  value?: string
  type?: string
  required?: boolean
  invalid?: boolean
  options?: { name: string; value: string }[]
}

class Example {
  readonly page: Page
  readonly firstName: Field
  readonly email: Field
  readonly password: Field
  readonly button: Locator

  constructor(page: Page) {
    this.page = page
    this.firstName = this.field('firstName')
    this.email = this.field('email')
    this.password = this.field('password')
    this.button = page.locator('form button:has-text("OK")')
  }

  field(name: string) {
    return {
      name,
      label: this.page.locator(`label[for="${name}"]`).first(),
      input: this.page.locator(`[name="${name}"]`).first(),
    }
  }

  async expectField(
    field: Field,
    {
      label: rawLabel,
      value = '',
      type = 'text',
      required = true,
      invalid = false,
    }: FieldOptions = {},
  ) {
    const label = rawLabel || startCase(field.name)

    await expect(field.label).toHaveText(label)
    await expect(field.label).toHaveId(`label-for-${field.name}`)
    await expect(field.input).toHaveValue(value)
    await expect(field.input).toHaveAttribute('type', type)
    await expect(field.input).toHaveAttribute('aria-invalid', String(invalid))

    await expect(field.input).toHaveAttribute(
      'aria-labelledby',
      `label-for-${field.name}`,
    )

    required
      ? await expect(field.input).toHaveAttribute('aria-required', 'true')
      : await expect(field.input).not.toHaveAttribute('aria-required', 'true')
  }

  async expectSelect(field: Field, options: FieldOptions = {}) {
    await this.expectField(field, { type: '', ...options })
  }

  async expectValid(field: Field) {
    await expect(field.input).toHaveAttribute('aria-invalid', 'false')
  }

  async expectInvalid(field: Field) {
    await expect(
      this.page.locator(`#errors-for-${field.name}`),
    ).toHaveAttribute('role', 'alert')

    await expect(field.input).toHaveAttribute('aria-invalid', 'true')

    await expect(field.input).toHaveAttribute(
      'aria-describedBy',
      `errors-for-${field.name}`,
    )
  }

  async expectError(field: Field, message: string) {
    await this.expectInvalid(field)

    await expect(this.page.locator(`#errors-for-${field.name}`)).toHaveText(
      message,
    )
  }

  async expectErrors(field: Field, ...messages: string[]) {
    await this.expectInvalid(field)

    for (var index = 0; index < messages.length; index++) {
      await expect(
        this.page.locator(`#errors-for-${field.name} > div`).nth(index),
      ).toHaveText(messages[index])
    }
  }

  async expectAutoFocus(field: Field) {
    await expect(await field.input.getAttribute('autofocus')).not.toBeNull()
  }

  async expectNoAutoFocus(field: Field) {
    await expect(await field.input.getAttribute('autofocus')).toBeNull()
  }
}

export { Example }