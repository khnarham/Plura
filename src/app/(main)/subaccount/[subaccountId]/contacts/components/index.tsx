'use client'
import { Button } from '@/components/ui/button'

import React from 'react'

import CustomModal from '@/components/global/customModel'
import ContactUserForm from '@/app/site/components/forms/contact-user-form'
import { useModal } from '../../../../../../../provider/model-provider'

type Props = {
  subaccountId: string
}

const CraeteContactButton = ({ subaccountId }: Props) => {
  const { setOpen } = useModal()

  const handleCreateContact = async () => {
    setOpen(
      <CustomModal
        title="Create Or Update Contact information"
        subheading="Contacts are like customers."
      >
        <ContactUserForm subaccountId={subaccountId} />
      </CustomModal>
    )
  }

  return <Button onClick={handleCreateContact}>Create Contact</Button>
}

export default CraeteContactButton