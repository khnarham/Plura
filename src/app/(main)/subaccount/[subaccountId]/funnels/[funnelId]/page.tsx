import BlurPage from '@/components/global/blur-page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getFunnel, getFunnels } from '@/lib/quries'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import FunnelSteps from './components/FunnelSteps'
import FunnelSettings from './components/FunnelSettings'


type Props = {
  params: Promise<{ funnelId: string; subaccountId: string}>
}

const FunnelPage = async ({ params }: Props) => {
  const {funnelId , subaccountId} = await params
  const funnelPages = await getFunnel(funnelId)
  if (!funnelPages)
    return redirect(`/subaccount/${subaccountId}/funnels`)

  return (
    <BlurPage>
      <Link
        href={`/subaccount/${subaccountId}/funnels`}
        className="flex justify-between gap-4 mb-4 text-muted-foreground"
      >
        Back
      </Link>
      <h1 className="text-3xl mb-8">{funnelPages.name}</h1>
      <Tabs
        defaultValue="steps"
        className="w-full"
      >
        <TabsList className="grid  grid-cols-2 w-[50%] bg-transparent ">
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="steps">
          <FunnelSteps
            funnel={funnelPages}
            subaccountId={subaccountId}
            pages={funnelPages.FunnelPages}
            funnelId={funnelId}
          />
        </TabsContent>
        <TabsContent value="settings">
          <FunnelSettings
          defaultData={funnelPages}
          subaccountId={subaccountId}
          />
        </TabsContent>
      </Tabs>
    </BlurPage>
  )
}

export default FunnelPage