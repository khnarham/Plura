'use client'
import { PricesList } from '@/lib/types'
import React, { useEffect } from 'react'
import { useModal } from '../../../../../../../provider/model-provider'
import { headers } from 'next/headers'
import { useSearchParams } from 'next/navigation'
import CustomModal from '@/components/global/customModel'
import SubscriptionFormWrapper from '@/app/site/components/forms/Subscription-form/SubscriptionFormWrapper'

type Props = {
    prices: PricesList['data']
  customerId: string
  planExists: boolean

}

const SubscriptionHelper = ({customerId , planExists , prices}: Props) => {
    const {setOpen} = useModal();
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan')
   

    useEffect(() => {
      if(plan){
        setOpen(
        <CustomModal
          title="Upgrade Plan!"
          subheading="Get started today to get access to premium features"
        >
               <SubscriptionFormWrapper
            planExists={planExists}
            customerId={customerId}
          />
        </CustomModal>,
           async () => ({
          plans: {
            defaultPriceId: plan ? plan : '',
            plans: prices,
          },
        })
        )
      }
      
    }, [plan])
    

    return <div>SubscriptionHelper</div>
}

export default SubscriptionHelper