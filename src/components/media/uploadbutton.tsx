'use client'
import React from 'react'
import { Button } from '../ui/button'

import { useModal } from '../../../provider/model-provider'
import CustomModal from '../global/customModel'
import UploadMediaForm from '@/app/site/components/forms/uploadMediaForm'

type Props = {
  subaccountId: string
}

const MediaUploadButton = ({ subaccountId }: Props) => {
  const { isOpen, setOpen, setClose } = useModal()

  return (
    <Button
      onClick={() => {
        setOpen(
          <CustomModal
            title="Upload Media"
            subheading="Upload a file to your media bucket"
          >
            <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
          </CustomModal>
        )
      }}
    >
      Upload
    </Button>
  )
}

export default MediaUploadButton