
import React from 'react'
import { EditorElement } from '../../../../../../../../../../provider/editor/EditorModel'
import TextComponent from './TextComponent'
import Container from './container'
import ContactFormComponentPlaceholder from '../../FunnerSideBar/tabs/components/contact-form-placeholder'
import ContactFormComponent from './contact-form'
import Checkout from './Checkout'
import LinkComponent from './LinkComponent'
import VedioComponent from './Vedio'

type Props = {
  element: EditorElement
}

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case 'text':
      return <TextComponent element={element} />
    case 'container':
      return <Container element={element} />
    case 'video':
      return <VedioComponent element={element} /> 
    case 'contactForm':
      return <ContactFormComponent element={element} />
    case 'paymentForm':
      return <Checkout element={element} />
    case '2Col':
      return <Container element={element} />
    case '__body':
      return <Container element={element} />

    case 'link':
      return <LinkComponent element={element} />
    default:
      return null
  }
}

export default Recursive