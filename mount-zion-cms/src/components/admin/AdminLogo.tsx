'use client'

import React from 'react'
import { CustomLogo } from '@/components/common/CustomLogo'

/**
 * AdminLogo Component
 * Replaces the Payload CMS default logo in the top-left sidebar and login page
 */
export const AdminLogo: React.FC = () => {
  return <CustomLogo variant="admin" />
}

/**
 * AdminIcon Component
 * Replaces the Payload CMS default icon when the sidebar is collapsed or on mobile
 */
export const AdminIcon: React.FC = () => {
  return <CustomLogo variant="icon" />
}

export default AdminLogo
