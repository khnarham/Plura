import { getAuthUserDetails } from '@/lib/quries'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import MenuOptions from './MenuOptions'

type Props = {
    id: string
    type: 'agency' | 'subaccount'
}

const Sidebar = async({id, type}: Props) => {
    const user = await getAuthUserDetails();
    if(!user) return null;
    if(!user.Agency) return


    const details = type === 'agency' ? user.Agency : user.Agency.SubAccount.find((subaccount)=> subaccount.id === id);
    if(!details) return
    const isWhiteLabelAgency = user.Agency.whiteLabel;
    let sideBarLogo = user.Agency.agencyLogo || '/plura-logo.svg'

    if(!isWhiteLabelAgency){
        if(type === 'subaccount'){
          sideBarLogo = user.Agency.SubAccount.find((subaccount)=> subaccount.id === id)?.subAccountLogo || user.Agency.agencyLogo
        }
    }

    const sidebarOpt = type === 'agency' ? user?.Agency.SidebarOption || [] : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
    ?.SidebarOption || []

    
    const subaccounts = user.Agency.SubAccount.filter((subaccount) => user.Permissions.find((permission)=> {
        permission.subAccountId === subaccount.id && permission.access
    }))

  return (
    <>
    
    <MenuOptions
      defaultOpen={true}
      details={details}
      id={id}
      sidebarLogo={sideBarLogo}
      sidebarOpt={sidebarOpt}
      subAccounts={subaccounts}
      user={user}
    />
    <MenuOptions
      details={details}
      id={id}
      sidebarLogo={sideBarLogo}
      sidebarOpt={sidebarOpt}
      subAccounts={subaccounts}
      user={user}
    />
  </>

  )
}

export default Sidebar