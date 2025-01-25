import AgencyDetails from '@/app/site/components/forms/AgencyDetails'
import UserDetails from '@/components/global/UserDetails'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:{agencyid: string}
}

const SettingPage = async({params}: Props) => {
    const user = await currentUser();
    if(!user){
        redirect('/site')
    };
    const userDetails = await db.user.findUnique({
        where:{
            email: user.emailAddresses[0].emailAddress
        }
    })

    if(!userDetails) return null;
    const agencyDetails = await db.agency.findUnique({
        where:{
            id: params.agencyid
        },
        include:{
            SubAccount: true
        }
    })

    if (!agencyDetails) return null;
    const subAccounts = agencyDetails.SubAccount 
  return (
    <div className='flex lg:flex-row flex-col gap-5'>
       <AgencyDetails
       data={agencyDetails}
       />
          <UserDetails
        type="agency"
        id={params.agencyid}
        subAccounts={subAccounts}
        userData={userDetails}
      />
    </div>
  )
}

export default SettingPage