
import { Button, Input, Tab, Tabs, Textarea, Listbox, ListboxItem } from '@nextui-org/react';
import React, {createContext, useContext, useEffect, useState} from 'react';
import SelectItem from './SelectItem';
import StepWizard from "react-step-wizard";
import { userId } from '../../../shared/utils';
import { api } from '../../../shared/api';
// requisition_code = models.CharField(unique=True, max_length=50, null = False, default='')
// created_at = models.DateTimeField(auto_now_add=True)
// requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requested_requisitions')
// approval_status = models.CharField(max_length=10, choices=STATUS_CHOICES, default = 'pending')
// approver = models.ForeignKey(User, null=True, blank= True, on_delete=models.SET_NULL, related_name='approved_requisitions')
// description = models.TextField(blank=True)
// notes = models.TextField(blank=True)
// approval_comment = models.TextField(blank=True)
// approved_at = models.DateTimeField(null=True, blank=True)
export const RequisitionContext = createContext()
const Detail = (prop) => {
  const {requisitionData, setRequisitionData} = useContext(RequisitionContext)
  return(
    <div>
        <Textarea 
            label="Description"
            isClearable
            name='description'
            labelPlacement='outside'
            size='lg'
            variant='bordered'
            value={requisitionData.description}
            onChange={(e)=>{setRequisitionData({...requisitionData, [e.target.name] : e.target.value})}}
              />
          <Button onClick={prop.nextStep}>Add Items</Button>
    </div>
  )
}

const Final = prop => {
  const {requisitionData,selectedItems} = useContext(RequisitionContext)
  
  async function handleSubmit (){
    const requisitionFormData = new FormData() 
    requisitionFormData.append('description', requisitionData.description)
   
    try {
      const response = await api.post('/requisition/requisitions', requisitionFormData)

          const requisitionId = response.data.id
          if(requisitionId){
         
          for(const item of selectedItems){
            for(const reqItem of item.requisitionItems){
             
                const reqItemForm = new FormData()
                reqItemForm.append('requisition', requisitionId)
                reqItemForm.append('variation', reqItem.variation.variation_id)
                reqItemForm.append('quantity', reqItem.quantity)
                for (const pair of reqItemForm){
                  console.log(`${pair[0]} ${pair[1]}`)
                }
              try {
                const response = await api.post('/requisition/items', reqItemForm)
                console.log(response)
              } catch (error) {
                console.error(error)
              }
            }
          }
        }else{
          console.log('NO REQUISITION ID')
        }
        
      }catch (error) {
      console.error(error)
    }
    
    
  }

  return (
    <div>
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
      <Button onClick={prop.previousStep}>Back</Button>
      <Button onClick={handleSubmit} color='primary'>Save</Button>
    </div>
  )
}

const AddRequisition = () => {
  const [requisitionData, setRequisitionData] = useState({
      'requester' : userId(),
      'description':'',
  })
  const [selectedItems, setSelectedItems] = useState([])


  return (
   <RequisitionContext.Provider value={{requisitionData,setRequisitionData,selectedItems, setSelectedItems}}>
      <div>
        <StepWizard>
          <Detail />
          <SelectItem />
          <Final />
        </StepWizard>
      </div>
      </RequisitionContext.Provider>
  
  );
};

export default AddRequisition;
