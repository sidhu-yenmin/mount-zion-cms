import type { Field } from 'payload'

export interface ColorFieldOptions {
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
  admin?: {
    width?: string
    description?: string
    readOnly?: boolean
    position?: 'sidebar'
    [key: string]: any
  }
}

export const colorField = (options: ColorFieldOptions): Field => {
  return {
    name: options.name,
    type: 'text',
    label: options.label,
    defaultValue: options.defaultValue,
    required: options.required,
    admin: {
      ...options.admin,
      components: {
        Field: '/components/admin/ColorPickerField#ColorPickerField',
      },
    },
  }
}
