'use client'

import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useField, FieldLabel } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'

// Color conversion utilities
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const f = (n: number, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
  return [
    Math.round(f(5) * 255),
    Math.round(f(3) * 255),
    Math.round(f(1) * 255),
  ]
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h *= 60
  }
  return [h, s, v]
}

function hexToRgb(hex: string): [number, number, number, number] {
  let cleaned = (hex || '').trim().replace(/^#/, '')
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('')
  }
  const r = parseInt(cleaned.substring(0, 2), 16) || 0
  const g = parseInt(cleaned.substring(2, 4), 16) || 0
  const b = parseInt(cleaned.substring(4, 6), 16) || 0
  let a = 1
  if (cleaned.length >= 8) {
    a = (parseInt(cleaned.substring(6, 8), 16) || 255) / 255
  }
  return [r, g, b, a]
}

function rgbToHex(r: number, g: number, b: number, a: number = 1): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0')
      .toUpperCase()
  let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  if (a < 0.999) {
    hex += toHex(Math.round(a * 255))
  }
  return hex
}

const PRESET_COLORS = [
  { label: 'Primary Brand Green', value: '#03594E' },
  { label: 'Dark Forest', value: '#022C22' },
  { label: 'Accent Gold', value: '#EAB308' },
  { label: 'Light Page BG', value: '#F8FAFC' },
  { label: 'Soft Gray', value: '#F4F6F8' },
  { label: 'Pure White', value: '#FFFFFF' },
  { label: 'Dark Slate Text', value: '#0F172A' },
  { label: 'Royal Blue', value: '#1E3A8A' },
  { label: 'Warm Amber', value: '#D97706' },
  { label: 'Emerald Light', value: '#ECFDF5' },
]

export const ColorPickerField: React.FC<TextFieldClientProps> = (props) => {
  const { path, field, readOnly } = props
  const { label, required } = field || {}
  const { value = '', setValue } = useField<string>({ path })

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const satValRef = useRef<HTMLDivElement>(null)
  const hueRef = useRef<HTMLDivElement>(null)
  const alphaRef = useRef<HTMLDivElement>(null)

  // Color state in HSV + Alpha
  const [hsv, setHsv] = useState<[number, number, number]>([0, 1, 1])
  const [alpha, setAlpha] = useState<number>(1)
  const [colorMode, setColorMode] = useState<'HEX' | 'RGB'>('HEX')
  const [hexInput, setHexInput] = useState<string>(value || '')

  // Sync initial color from props value
  useEffect(() => {
    if (value) {
      const [r, g, b, a] = hexToRgb(value)
      const [h, s, v] = rgbToHsv(r, g, b)
      setHsv([h, s, v])
      setAlpha(a)
      setHexInput(value)
    }
  }, [value])

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Update color and notify Payload
  const updateColor = useCallback(
    (newHsv: [number, number, number], newAlpha: number) => {
      setHsv(newHsv)
      setAlpha(newAlpha)
      const [r, g, b] = hsvToRgb(newHsv[0], newHsv[1], newHsv[2])
      const newHex = rgbToHex(r, g, b, newAlpha)
      setHexInput(newHex)
      setValue(newHex)
    },
    [setValue]
  )

  // Saturation & Value 2D Box drag handler
  const handleSatValMove = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!satValRef.current) return
      const rect = satValRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top))
      const s = x / rect.width
      const v = 1 - y / rect.height
      updateColor([hsv[0], s, v], alpha)
    },
    [hsv, alpha, updateColor]
  )

  const handleSatValMouseDown = (e: React.MouseEvent) => {
    handleSatValMove(e)
    const onMouseMove = (moveEvent: MouseEvent) => handleSatValMove(moveEvent)
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // Hue Slider drag handler
  const handleHueMove = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!hueRef.current) return
      const rect = hueRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
      const h = (x / rect.width) * 360
      updateColor([h, hsv[1], hsv[2]], alpha)
    },
    [hsv, alpha, updateColor]
  )

  const handleHueMouseDown = (e: React.MouseEvent) => {
    handleHueMove(e)
    const onMouseMove = (moveEvent: MouseEvent) => handleHueMove(moveEvent)
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // Alpha Slider drag handler
  const handleAlphaMove = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!alphaRef.current) return
      const rect = alphaRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
      const a = Number((x / rect.width).toFixed(2))
      updateColor(hsv, a)
    },
    [hsv, updateColor]
  )

  const handleAlphaMouseDown = (e: React.MouseEvent) => {
    handleAlphaMove(e)
    const onMouseMove = (moveEvent: MouseEvent) => handleAlphaMove(moveEvent)
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // Current RGB for preview & tracks
  const [currR, currG, currB] = hsvToRgb(hsv[0], hsv[1], hsv[2])
  const pureHueRgb = hsvToRgb(hsv[0], 1, 1)

  return (
    <div ref={containerRef} style={{ marginBottom: '1.25rem', position: 'relative' }}>
      {label && <FieldLabel label={label} required={required} path={path} />}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
        {/* Main Input Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Clickable Swatch */}
          <button
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && setIsOpen(!isOpen)}
            title="Open visual color picker"
            style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              border: '2px solid rgba(0,0,0,0.15)',
              backgroundColor: value || '#FFFFFF',
              cursor: readOnly ? 'default' : 'pointer',
              flexShrink: 0,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              backgroundImage:
                'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
              backgroundSize: '10px 10px',
              backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '6px',
                backgroundColor: value || '#FFFFFF',
              }}
            />
          </button>

          {/* Hex Input */}
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              disabled={readOnly}
              value={hexInput}
              placeholder="#03594E"
              onChange={(e) => {
                const val = e.target.value
                setHexInput(val)
                if (/^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(val)) {
                  const [r, g, b, a] = hexToRgb(val)
                  const [h, s, v] = rgbToHsv(r, g, b)
                  setHsv([h, s, v])
                  setAlpha(a)
                  setValue(val.startsWith('#') ? val : `#${val}`)
                }
              }}
              style={{
                width: '100%',
                height: '42px',
                padding: '8px 12px',
                fontSize: '14px',
                fontFamily: 'monospace',
                fontWeight: 600,
                borderRadius: '6px',
                border: '1px solid var(--theme-elevation-150, #cbd5e1)',
                backgroundColor: 'var(--theme-input-bg, #ffffff)',
                color: 'var(--theme-text, #0f172a)',
                outline: 'none',
              }}
            />
          </div>

          {/* Reset / Clear Button */}
          {value && !readOnly && (
            <button
              type="button"
              onClick={() => {
                setHexInput('')
                setValue('')
              }}
              style={{
                height: '42px',
                padding: '0 12px',
                borderRadius: '6px',
                border: '1px solid var(--theme-elevation-150, #cbd5e1)',
                backgroundColor: 'transparent',
                color: 'var(--theme-text, #64748b)',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          )}
        </div>

        {/* Quick Brand Presets (Commented out as requested) */}
        {/* {!readOnly && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', paddingTop: '2px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--theme-elevation-500, #94a3b8)', textTransform: 'uppercase', marginRight: '2px' }}>
              Presets:
            </span>
            {PRESET_COLORS.map((preset) => {
              const isSelected = value?.toLowerCase() === preset.value.toLowerCase()
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => {
                    const [r, g, b, a] = hexToRgb(preset.value)
                    const [h, s, v] = rgbToHsv(r, g, b)
                    updateColor([h, s, v], a)
                  }}
                  title={`${preset.label}: ${preset.value}`}
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '4px',
                    backgroundColor: preset.value,
                    border: isSelected ? '2px solid #3b82f6' : '1px solid rgba(0,0,0,0.2)',
                    boxShadow: isSelected ? '0 0 0 1px #3b82f6' : 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'transform 0.1s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              )
            })}
          </div>
        )} */}
      </div>

      {/* VISUAL COLOR PICKER POPOVER (Referenced from user image) */}
      {isOpen && !readOnly && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            zIndex: 99999,
            width: '260px',
            backgroundColor: '#1E1E21',
            borderRadius: '14px',
            padding: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            userSelect: 'none',
          }}
        >
          {/* 1. 2D Saturation / Value Gradient Canvas */}
          <div
            ref={satValRef}
            onMouseDown={handleSatValMouseDown}
            style={{
              position: 'relative',
              width: '100%',
              height: '150px',
              borderRadius: '8px',
              cursor: 'crosshair',
              overflow: 'hidden',
              backgroundColor: `rgb(${pureHueRgb[0]}, ${pureHueRgb[1]}, ${pureHueRgb[2]})`,
            }}
          >
            {/* White horizontal gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, #FFFFFF, transparent)',
              }}
            />
            {/* Black vertical gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent, #000000)',
              }}
            />
            {/* Draggable Circle Thumb */}
            <div
              style={{
                position: 'absolute',
                left: `${hsv[1] * 100}%`,
                top: `${(1 - hsv[2]) * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '2px solid #FFFFFF',
                backgroundColor: `rgb(${currR}, ${currG}, ${currB})`,
                boxShadow: '0 0 4px rgba(0,0,0,0.6)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* 2. Hue Rainbow Slider */}
          <div
            ref={hueRef}
            onMouseDown={handleHueMouseDown}
            style={{
              position: 'relative',
              width: '100%',
              height: '14px',
              borderRadius: '7px',
              cursor: 'pointer',
              background:
                'linear-gradient(to right, #FF0000 0%, #FFFF00 17%, #00FF00 33%, #00FFFF 50%, #0000FF 67%, #FF00FF 83%, #FF0000 100%)',
            }}
          >
            {/* Hue Thumb */}
            <div
              style={{
                position: 'absolute',
                left: `${(hsv[0] / 360) * 100}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '3px solid #FFFFFF',
                backgroundColor: `rgb(${pureHueRgb[0]}, ${pureHueRgb[1]}, ${pureHueRgb[2]})`,
                boxShadow: '0 1px 4px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* 3. Alpha / Opacity Slider */}
          <div
            ref={alphaRef}
            onMouseDown={handleAlphaMouseDown}
            style={{
              position: 'relative',
              width: '100%',
              height: '14px',
              borderRadius: '7px',
              cursor: 'pointer',
              backgroundImage:
                'linear-gradient(45deg, #444 25%, transparent 25%), linear-gradient(-45deg, #444 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #444 75%), linear-gradient(-45deg, transparent 75%, #444 75%)',
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
              overflow: 'hidden',
            }}
          >
            {/* Alpha Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to right, transparent, rgb(${currR}, ${currG}, ${currB}))`,
              }}
            />
            {/* Alpha Thumb */}
            <div
              style={{
                position: 'absolute',
                left: `${alpha * 100}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '3px solid #FFFFFF',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 4px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* 4. Bottom Controls Row (HEX | Value Box | Opacity %) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              paddingTop: '2px',
            }}
          >
            {/* Format Selector */}
            <button
              type="button"
              onClick={() => setColorMode(colorMode === 'HEX' ? 'RGB' : 'HEX')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                height: '32px',
                padding: '0 8px',
                borderRadius: '6px',
                backgroundColor: '#2A2A2E',
                color: '#E2E8F0',
                fontSize: '12px',
                fontWeight: 700,
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
              }}
            >
              {colorMode}
              <span style={{ fontSize: '9px', opacity: 0.7 }}>▼</span>
            </button>

            {/* Value Display Box */}
            <div style={{ flex: 1 }}>
              <input
                type="text"
                value={
                  colorMode === 'HEX'
                    ? rgbToHex(currR, currG, currB, alpha)
                    : `${currR}, ${currG}, ${currB}`
                }
                onChange={(e) => {
                  const val = e.target.value
                  if (colorMode === 'HEX' && /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(val)) {
                    const [r, g, b, a] = hexToRgb(val)
                    const [h, s, v] = rgbToHsv(r, g, b)
                    updateColor([h, s, v], a)
                  }
                }}
                style={{
                  width: '100%',
                  height: '32px',
                  padding: '0 8px',
                  borderRadius: '6px',
                  backgroundColor: '#2A2A2E',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textAlign: 'center',
                  outline: 'none',
                }}
              />
            </div>

            {/* Opacity % Box */}
            <div
              style={{
                height: '32px',
                padding: '0 8px',
                borderRadius: '6px',
                backgroundColor: '#2A2A2E',
                color: '#E2E8F0',
                fontSize: '12px',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '55px',
              }}
            >
              {Math.round(alpha * 100)} %
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
