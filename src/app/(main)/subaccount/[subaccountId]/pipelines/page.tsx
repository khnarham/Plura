import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:Promise<{subaccountId: string}>
}

const Piplelines = async({params}: Props) => {
  const {subaccountId} = await params
  const pipeLinesExists = await db.pipeline.findFirst({
    where:{subAccountId: subaccountId}
  }) 

  if(pipeLinesExists){
    return redirect(`/subaccount/${subaccountId}/pipelines/${pipeLinesExists.id}`)
  }

  try {
     const response = await db.pipeline.create({
        data:{name: 'First Pipelines' , subAccountId:subaccountId}
     })

     redirect(`/subaccount/${subaccountId}/pipelines/${response.id}`)
  } catch (error) {
     console.error(error)
     return null
  }
}

export default Piplelines