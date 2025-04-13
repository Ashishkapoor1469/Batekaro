import ConverstaionFallback from '@/components/shared/converstaion/ConverstaionFallback'
import ItemList from '@/components/shared/item-list/ItemList'
import React from 'react'

const page = () => {
  return (
    <div className='py-4 w-full h-full flex gap-2 pe-2'>
      <ItemList title='Friends'>
      Friends page
      </ItemList>
      <ConverstaionFallback/>
      </div>
  )
}

export default page