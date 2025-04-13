import ConverstaionContainer from '@/components/shared/converstaion/ConverstaionContainer'
import ItemList from '@/components/shared/item-list/ItemList'
import React from 'react'


const page = () => {
  return (
    <div className='py-4 flex w-full h-full lg:pe-4 gap-4'>
   
   <div className='lg:block hidden'><ItemList title='Conversations'>
Converstaion page
    </ItemList>
    </div> 
    <ConverstaionContainer>
      Converstaion Page
    </ConverstaionContainer>
    </div>
  )
}

export default page