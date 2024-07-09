import { Choice } from '@/lib/types'
import React from 'react'


interface ChoicesProps{
    choices:Choice[],
    initialValue:Choice,
    setValue:(_:Choice)=>void
}

const Choices = () => {
  return (
    <div>Choices</div>
  )
}

export default Choices