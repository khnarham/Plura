import BlurPage from '@/components/global/blur-page'
import InfoBar from '@/components/global/infobar'
import Sidebar from '@/components/sidebar'
import { getAuthUserDetails, getNotificationAndUser, verifyAndAcceptInvitation } from '@/lib/quries'
import { currentUser } from '@clerk/nextjs/server'

import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
  params: Promise<{ subaccountId: string }>
}

const SubaccountLayout = async ({ children, params }: Props) => {
  const {subaccountId} = await params
  const agencyId = await verifyAndAcceptInvitation()
  if (!agencyId) return 
  const user = await currentUser()
  if (!user) {
    return redirect('/')
  }

  let notifications: any = []

  if (!user.privateMetadata.role) {
    return 
  } else {
    const allPermissions = await getAuthUserDetails()
    const hasPermission = allPermissions?.Permissions.find(
      (permissions) =>
        permissions.access && permissions.subAccountId === subaccountId
    )
    if (!hasPermission) {
      return 
    }

    const allNotifications = await getNotificationAndUser(agencyId)

    if (
      user.privateMetadata.role === 'AGENCY_ADMIN' ||
      user.privateMetadata.role === 'AGENCY_OWNER'
    ) {
      notifications = allNotifications
    } else {
      const filteredNoti = allNotifications?.filter(
        (item) => item.subAccountId === subaccountId
      )
      if (filteredNoti) notifications = filteredNoti
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar
        id={subaccountId}
        type="subaccount"
      />

      <div className="md:pl-[300px]">
        <InfoBar
          notifications={notifications}
          role={user.privateMetadata.role as Role}
          subAccountId={subaccountId as string}
        />
     <div className="relative">{children}</div>
      </div>
    </div>
  )
} 

export default SubaccountLayout