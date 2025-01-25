'use client'
import { Button } from '@/components/ui/button'
import { Agency, AgencySidebarOption, SubAccount, User } from '@prisma/client'
import { PlusCircleIcon } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { useModal } from '../../../../../../../provider/model-provider'
import CustomModal from '@/components/global/customModel'
import SubAccountDetails from '@/app/site/components/forms/SubAccountDetails'

type Props = {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[]
              SideBarOption: AgencySidebarOption[]
            })
        )
      | null
  }
  id: string
  className: string
}

const CreateSubaccountButton = ({ className, id, user }: Props) => {
  const { setOpen } = useModal()
  const agencyDetails = user.Agency

  if (!agencyDetails) return

  return (
    <Button
      className={twMerge('w-full flex gap-4', className)}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Create a Subaccount"
            subheading="You can switch bettween"
          >
            <SubAccountDetails
              agencyDetails={agencyDetails}
              userId={user.id}
              userName={user.name}
            />
          </CustomModal>
        )
      }}
    >
      <PlusCircleIcon size={15} />
      Create Sub Account
    </Button>
  )
}

export default CreateSubaccountButton