
import BlurPage from '@/components/global/blur-page'
import InfoBar from '@/components/global/infobar'
import Sidebar from '@/components/sidebar'
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from '@/lib/quries'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
  params: Promise<{ agencyid: string }>
}

const layout = async ({ children, params }: Props) => {
  const {agencyid} = await params
  const agencyId = await verifyAndAcceptInvitation()
  const user = await currentUser()

  if (!user) {
    return redirect('/')
  }

  if (!agencyId) {
    return redirect('/agency')
  }

  if (
    user.privateMetadata.role !== 'AGENCY_OWNER' &&
    user.privateMetadata.role !== 'AGENCY_ADMIN'
  )
    return <div>Not Autorized</div>

  
    let allNoti: any = []
    const notifications = await getNotificationAndUser(agencyId)
    if (notifications) allNoti = notifications
  
 

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar
        id={agencyid}
        type="agency"
      />
              <div className="md:pl-[300px]">
              <InfoBar
          notifications={allNoti}
          role={allNoti.User?.role}
        />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>

    </div>
  )
}

export default layout