'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * AdminAutoLogin Helper
 * Automatically logs in and bypasses the login screen during development
 */
export const AdminAutoLogin: React.FC = () => {
  const pathname = usePathname()
  const attemptedRef = useRef(false)

  useEffect(() => {
    // Auto-login bypassed so the login screen logic is restored
    /*
    if (pathname && pathname.includes('/admin/login') && !attemptedRef.current) {
      attemptedRef.current = true
      fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'sidhu.yenmin@gmail.com',
          password: 'Yenmin@123',
        }),
      })
        .then((res) => {
          if (res.ok) {
            window.location.href = '/admin'
          }
        })
        .catch(() => {
          // ignore
        })
    }
    */
  }, [pathname])

  return null
}

export default AdminAutoLogin
