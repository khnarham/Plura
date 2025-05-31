
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/quries';
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  searchParams: Promise<{ state: string; code: string }>
}

const SubAccountMainPage = async ({ searchParams }: Props) => {
  const params = await searchParams
  const agencyId = await verifyAndAcceptInvitation()

  if (!agencyId) {
    return 
  }

  const user = await getAuthUserDetails()
  if (!user) return

  const getFirstSubaccountWithAccess = user.Permissions.find(
    (permission) => permission.access === true
  )

  if (params.state) {
    const statePath = params.state.split('___')[0]
    const stateSubaccountId = params.state.split('___')[1]
    if (!stateSubaccountId) return 
    return redirect(
      `/subaccount/${stateSubaccountId}/${statePath}?code=${params.code}`
    )
  }

  if (getFirstSubaccountWithAccess) {
    return redirect(`/subaccount/${getFirstSubaccountWithAccess.subAccountId}`)
  }

  return 
}

export default SubAccountMainPage