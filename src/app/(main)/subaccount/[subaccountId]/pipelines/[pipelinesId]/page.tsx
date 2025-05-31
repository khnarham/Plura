import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { db } from '@/lib/db'
import { getLanesWithTicketAndTags, getPipelineDetails, updateLanesOrder, updateTicketsOrder } from '@/lib/quries'
import { LaneDetail } from '@/lib/types'
import { redirect } from 'next/navigation'
import React from 'react'
import PipelineInfoBar from './components/PipelinesInfoBar'
import PipelineView from './components/PipeLinesView'

type Props = {
    params: Promise<{subaccountId: string , pipelinesId: string}>
}

const PipelinesPage = async({params}: Props) => {
  const {subaccountId , pipelinesId } = await params
    const pipeLinesDetails = await getPipelineDetails(pipelinesId)
    if(!pipeLinesDetails){
        return redirect(`/subaccount/${subaccountId}/pipelines`)
    }
    const pipelines = await db.pipeline.findMany({
        where:{subAccountId: subaccountId}
    })
    const lanes = await getLanesWithTicketAndTags(pipelinesId)
  return (
    <Tabs defaultValue='view'
    className='w-full'
    >
      <TabsList className="bg-transparent border-b-2 h-16 w-full justify-between mb-4">
      <PipelineInfoBar
           subAccountId={subaccountId}
           pipelineId={pipelinesId}
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
          pipelineId={pipelinesId}
          subaccountId={subaccountId}
          updateLanesOrder={updateLanesOrder}
          updateTicketsOrder={updateTicketsOrder}
        />
      </TabsContent>
    </Tabs>
  )
}

export default PipelinesPage