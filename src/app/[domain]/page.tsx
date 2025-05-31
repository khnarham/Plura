import { db } from '@/lib/db'
import { getDomainContent } from '@/lib/quries'


import { notFound } from 'next/navigation'
import EditorProvider from '../../../provider/editor/EditorModel'
import FunnelEditor from '../(main)/subaccount/[subaccountId]/funnels/[funnelId]/components/funnelEditor'

import React, { ReactNode } from 'react';

type Props = { params: Promise<{ domain: string }> };

const Page = async ({ params }: Props) => {
  const {domain} = await params
  const domainData = await getDomainContent(domain.slice(0, -1));
  if (!domainData) return notFound();

  const pageData = domainData.FunnelPages.find((page) => !page.pathName);

  if (!pageData) return notFound();

  await db.funnelPage.update({
    where: { id: pageData.id },
    data: { visits: { increment: 1 } },
  });

  return (
    <EditorProvider
      subaccountId={domainData.subAccountId}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <FunnelEditor funnelPageId={pageData.id} liveMode={true} />
    </EditorProvider>
  );
};

export default Page;
