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
      // Ignore hidden, checkbox, radio, file, submit, button, date, color inputs
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
          type === 'color' ||
          type === 'date' ||
          type === 'time'
        ) {
          return
        }
      }

      // If already processed, marked no-clear, or inside header search, skip
      if (
        field.dataset.hasClearButton === 'true' ||
        field.dataset.noClear === 'true' ||
        field.classList.contains('sneat-search-input') ||
        field.closest('.sneat-proper-search') ||
        field.closest('.sneat-header-controls') ||
        field.parentElement?.classList.contains('payload-clear-input-wrapper')
      ) {
        return
      }

      const parent = field.parentElement
      if (!parent) return

      const isTextarea = field instanceof HTMLTextAreaElement

      // Create a tight wrapper around the input/textarea ONLY
      const wrapper = document.createElement('div')
      wrapper.className = 'payload-clear-input-wrapper'
      wrapper.style.position = 'relative'
      wrapper.style.display = 'block'
      wrapper.style.width = '100%'

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

      // Replace field in DOM with wrapper, then place field and button inside wrapper
      parent.insertBefore(wrapper, field)
      wrapper.appendChild(field)
      wrapper.appendChild(clearBtn)

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
