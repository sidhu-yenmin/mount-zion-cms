'use client'

import { useEffect } from 'react'

export const AdminInputClearHelper: React.FC = () => {
  useEffect(() => {
    // Native setters to trigger React 18/19 controlled input state update
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set
    const nativeTextareaValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value'
    )?.set

    const clearFieldValue = (element: HTMLInputElement | HTMLTextAreaElement) => {
      if (element instanceof HTMLInputElement && nativeInputValueSetter) {
        nativeInputValueSetter.call(element, '')
      } else if (element instanceof HTMLTextAreaElement && nativeTextareaValueSetter) {
        nativeTextareaValueSetter.call(element, '')
      } else {
        element.value = ''
      }

      // Dispatch native input and change events so Payload's React form state detects the clear
      element.dispatchEvent(new Event('input', { bubbles: true }))
      element.dispatchEvent(new Event('change', { bubbles: true }))
      element.focus()
    }

    const attachClearButton = (field: HTMLInputElement | HTMLTextAreaElement) => {
      // Ignore hidden, checkbox, radio, file, submit, button, date inputs
      if (field instanceof HTMLInputElement) {
        const type = field.type?.toLowerCase()
        if (
          type === 'hidden' ||
          type === 'checkbox' ||
          type === 'radio' ||
          type === 'file' ||
          type === 'submit' ||
          type === 'button' ||
          type === 'range' ||
          type === 'color'
        ) {
          return
        }
      }

      // If already processed, skip
      if (field.dataset.hasClearButton === 'true') {
        return
      }

      // Find suitable container (field parent or wrapper)
      const parent = field.parentElement
      if (!parent) return

      // Ensure parent has relative positioning
      const computedPos = window.getComputedStyle(parent).position
      if (computedPos === 'static') {
        parent.style.position = 'relative'
      }

      const isTextarea = field instanceof HTMLTextAreaElement

      // Create clear button element
      const clearBtn = document.createElement('button')
      clearBtn.type = 'button'
      clearBtn.className = isTextarea ? 'payload-clear-btn textarea-clear-btn' : 'payload-clear-btn'
      clearBtn.innerHTML = '✕'
      clearBtn.title = 'Clear text'
      clearBtn.tabIndex = -1
      clearBtn.setAttribute('aria-label', 'Clear text')

      const updateVisibility = () => {
        if (field.value && field.value.trim().length > 0) {
          clearBtn.style.display = 'flex'
        } else {
          clearBtn.style.display = 'none'
        }
      }

      clearBtn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        clearFieldValue(field)
        updateVisibility()
      })

      clearBtn.addEventListener('mousedown', (e) => {
        // Prevent field from losing focus before click
        e.preventDefault()
      })

      field.addEventListener('input', updateVisibility)
      field.addEventListener('change', updateVisibility)
      field.addEventListener('focus', updateVisibility)

      // Add clear button next to the input
      if (field.nextSibling) {
        parent.insertBefore(clearBtn, field.nextSibling)
      } else {
        parent.appendChild(clearBtn)
      }

      field.dataset.hasClearButton = 'true'
      updateVisibility()
    }

    const scanAndAttach = () => {
      const inputs = document.querySelectorAll<HTMLInputElement>(
        'input[type="text"], input[type="email"], input[type="url"], input[type="tel"], input[type="number"], input:not([type])'
      )
      const textareas = document.querySelectorAll<HTMLTextAreaElement>('textarea')

      inputs.forEach(attachClearButton)
      textareas.forEach(attachClearButton)
    }

    // Run initial scan
    scanAndAttach()

    // Observe DOM mutations to attach to dynamically added inputs (arrays, blocks, tabs)
    const observer = new MutationObserver(() => {
      scanAndAttach()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
