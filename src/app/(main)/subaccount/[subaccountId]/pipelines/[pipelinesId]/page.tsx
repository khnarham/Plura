import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { db } from '@/lib/db'
import { getLanesWithTicketAndTags, getPipelineDetails, updateLanesOrder, updateTicketsOrder } from '@/lib/quries'
import { LaneDetail } from '@/lib/types'
import { redirect } from 'next/navigation'
import React from 'react'
import PipelineInfoBar from './components/PipelinesInfoBar'
import PipelineView from './components/PipeLinesView'

type Props = {
    params: {subaccountId: string , pipelinesId: string}
}

const PipelinesPage = async({params}: Props) => {
    const pipeLinesDetails = await getPipelineDetails(params.pipelinesId)
    if(!pipeLinesDetails){
        return redirect(`/subaccount/${params.subaccountId}/pipelines`)
    }
    const pipelines = await db.pipeline.findMany({
        where:{subAccountId: params.subaccountId}
    })
    const lanes = await getLanesWithTicketAndTags(params.pipelinesId)
  return (
    <Tabs defaultValue='view'
    className='w-full'
    >
      <TabsList className="bg-transparent border-b-2 h-16 w-full justify-between mb-4">
      <PipelineInfoBar
           subAccountId={params.subaccountId}
           pipelineId={params.pipelinesId}
           pipelines={pipelines}
           />
               <div>
          <TabsTrigger value="view">Pipeline View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="view">
      <PipelineView
      //@ts-ignore
          lanes={lanes}
          pipelineDetails={pipeLinesDetails}
          pipelineId={params.pipelinesId}
          subaccountId={params.subaccountId}
          updateLanesOrder={updateLanesOrder}
          updateTicketsOrder={updateTicketsOrder}
        />
      </TabsContent>
    </Tabs>
  )
}

export default PipelinesPage