
import { getDomainContent } from '@/lib/quries';
import { notFound } from 'next/navigation'
import React from 'react'
import EditorProvider from '../../../../provider/editor/EditorModel';
import FunnelEditor from '@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/components/funnelEditor';

const Page = async ({
  params,
}: {
  params: Promise<{ domain: string; path: string }>
}) => {
  const {domain , path} = await params
  const domainData = await getDomainContent(domain.slice(0, -1))
  const pageData = domainData?.FunnelPages.find(
    (page) => page.pathName === path
  )

  if (!pageData || !domainData) return notFound()

  return (
    <EditorProvider
      subaccountId={domainData.subAccountId}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <FunnelEditor
        funnelPageId={pageData.id}
        liveMode={true}
      />
    </EditorProvider>
  )
}

export default Page