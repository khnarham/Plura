import { db } from '@/lib/db'
import React from 'react'

import { Plus } from 'lucide-react'
import { currentUser } from '@clerk/nextjs/server'
import { columns } from './columns'
import DataTable from './data-tabel'
import SendInvitation from '@/app/site/components/forms/SendInvitation'


type Props = {
  params: Promise<{ agencyid: string }>
}

const TeamPage = async ({ params }: Props) => {
  const{agencyid} = await params
  const authUser = await currentUser()
  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: agencyid,
      },
    },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  })

  if (!authUser) return null
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: agencyid,
    },
    include: {
      SubAccount: true,
    },
  })

  if (!agencyDetails) return

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren={<SendInvitation agencyId={agencyDetails.id} />}
      filterValue="name"
      columns={columns}
      data={teamMembers}
    ></DataTable>
  )
}

export default TeamPage