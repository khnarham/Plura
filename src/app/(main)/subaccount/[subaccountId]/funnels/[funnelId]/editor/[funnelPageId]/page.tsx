import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import FunnelEditorNavigation from '../../components/FunnelEditorNavigation'
import EditorProvider from '../../../../../../../../../provider/editor/EditorModel'
import FunnelEditor from '../../components/funnelEditor'
import FunnelEditorSidebar from '../../components/FunnerSideBar'


type Props = {
  params: Promise<{
    subaccountId: string
    funnelId: string
    funnelPageId: string
  }>
}

const Page = async ({ params }: Props) => {
  const {subaccountId,funnelId,funnelPageId} = await params
  const funnelPageDetails = await db.funnelPage.findFirst({
    where: {
      id: funnelPageId,
    },
  })
  if (!funnelPageDetails) {
    return redirect(
      `/subaccount/${subaccountId}/funnels/${funnelId}`
    )
  }

  return (
    <div className="fixed top-0 bottom-0  left-0 right-0 z-[20] bg-background overflow-hidden">
      <EditorProvider
        subaccountId={subaccountId}
        funnelId={funnelId}
        pageDetails={funnelPageDetails}
      >
        <FunnelEditorNavigation
          funnelId={funnelId}
          funnelPageDetails={funnelPageDetails}
          subaccountId={subaccountId}
        />
        <div className="h-full  flex justify-center">
        <FunnelEditor funnelPageId={funnelPageId} />
        </div>
        <FunnelEditorSidebar subaccountId={subaccountId} />
      </EditorProvider>
    </div>
  )
}

export default Page