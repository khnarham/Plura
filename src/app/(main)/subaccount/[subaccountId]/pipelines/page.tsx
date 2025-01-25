import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:{subaccountId: string}
}

const Piplelines = async({params}: Props) => {
  const pipeLinesExists = await db.pipeline.findFirst({
    where:{subAccountId: params.subaccountId}
  }) 

  if(pipeLinesExists){
    return redirect(`/subaccount/${params.subaccountId}/pipelines/${pipeLinesExists.id}`)
  }

  try {
     const response = await db.pipeline.create({
        data:{name: 'First Pipelines' , subAccountId: params.subaccountId}
     })

     redirect(`/subaccount/${params.subaccountId}/pipelines/${response.id}`)
  } catch (error) {
     console.error(error)
     return null
  }
}

export default Piplelines