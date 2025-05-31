
import React from 'react'
import { Plus } from 'lucide-react'

import BlurPage from '@/components/global/blur-page'
import FunnelForm from '@/app/site/components/forms/FunnelForm'
import FunnelsDataTable from './date-tabel'
import { columns } from './column'
import { getFunnels } from '@/lib/quries'

const Funnels = async ({ params }: { params: Promise<{ subaccountId: string }> }) => {
  const {subaccountId} = await params
  const funnels = await getFunnels(subaccountId)
  if (!funnels) return null

  return (
    <BlurPage>
      <FunnelsDataTable
        actionButtonText={
          <>
            <Plus size={15} />
            Create Funnel
          </>
        }
        modalChildren={
          <FunnelForm subAccountId={subaccountId}></FunnelForm>
        }
        filterValue="name"
        columns={columns}
        data={funnels}
      />
    </BlurPage>
  )
}

export default Funnels