import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../../shared/api'
import Loading from '../../../shared/components/Loading'
import { Accordion, AccordionItem, Checkbox,Table, TableHeader, TableColumn, TableBody, TableCell, TableRow, Tab, Listbox, ListboxItem, ListboxSection, Button, select } from '@nextui-org/react'
import Item from './Item'
import { RequisitionContext } from './AddRequisition'

const SelectItem = (prop) => {
  const [items,setItems] = useState([])
  const [ready, setReady] = useState(false)
  const {selectedItems, setSelectedItems} = useContext(RequisitionContext)
  useEffect(()=>{
    async function getItems(){
      try {
        const response = await api.get('/inventory/get-delicacies-with-variations')
        const status = response?.status
        if(status === 200){
          setItems(response.data)
          setReady(true)
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    getItems()
  },[])

  const filteredItems = items.filter(item => item.variations.length > 0)

  async function createRequisition(){}
  async function submitRequisition(){

  }


  return (
    <div style={{'display':'flex'}}>
    {ready ?
    <div>
      <Listbox aria-label="List of items">
        {filteredItems.map((item, index) => {
          return <ListboxSection key={index} title={item.delicacy_name}>
               {item.variations.map(variation => (
                    <ListboxItem isReadOnly key={variation.variation_id} textValue={variation.variation_name}><Item delicacyName={item.delicacy_name} delicacyId={item.delicacy_id} variation={variation} /></ListboxItem>
                  ))}
          </ListboxSection>
        })}
        </Listbox>
     
      </div>
    : <Loading/>}
    
      <Listbox emptyContent='No Selected Items' aria-label='list of selected'>
      {selectedItems.map(item => (
         <ListboxItem textValue={item.delicacyId.toString()} key={item.delicacyId}>
            {item.delicacyName}
            <Listbox aria-label='list of variations'>
            {item.requisitionItems.map(reqItem => (
              <ListboxItem key={reqItem.variation.variation_id} textValue={reqItem.variation.variation_name}>{`${reqItem.variation.variation_name} ${reqItem.quantity}`}</ListboxItem>
              ))}
            </Listbox>
            
         </ListboxItem>
         ))}
      </Listbox>
      <Button onPress={()=>{}} color={selectedItems.length > 0 ? "primary" : "default"} isDisabled={selectedItems.length > 0 ? false : true}>OK</Button>
      <Button onClick={prop.previousStep}>Prev</Button>
      <Button onClick={prop.nextStep}>Next</Button>
    </div>
  )
}

export default SelectItem
