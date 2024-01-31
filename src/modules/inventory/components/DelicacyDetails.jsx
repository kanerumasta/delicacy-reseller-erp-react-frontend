import { Spinner,Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,
     Tooltip, useDisclosure, Modal, ModalHeader, ModalContent,ModalFooter, ModalBody,
    Input} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../shared/api'
import { MdDelete, MdEdit } from 'react-icons/md'

import { FaBurger } from "react-icons/fa6";
import { FaPesoSign } from "react-icons/fa6";
import { VariationsTable } from './Utils'
import LoadingLine from '../../../shared/components/LoadingLine'
const DelicacyDetails = () => {
    
    //STATES
    const [actionData, setActionData] = useState({
        'delicacyId' : '',
        'variationId' : '',
        'newVariationName': '',
        'newVariationPrice':'',
        'oldVariationName':'',
        'oldVariationPrice':'',
    })

    const [refresh, setRefresh] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])

    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const { delicacyId } = useParams()
    
    
    useEffect(()=>{
        async function fetchDetails(){
            try {
                const response = await api.get(`inventory/delicacies/${delicacyId}`)
                
                if(response && response.status === 200){  
                    setData(response.data)
                    setActionData({...actionData, 'delicacyId': response.data.id})
                    
                    
                }
            } catch (error) {
                console.error(error)
            }     
            setIsLoading(false)      
        }
        fetchDetails()
    },['',refresh])

    function isValidData(){
        if(actionData.newVariationName === actionData.oldVariationName && actionData.newVariationPrice === actionData.oldVariationPrice){
            console.log('No changes made')
            return false
        }
        if(actionData.newVariationName === '' || actionData.oldVariationName === ''){
            console.log('No fields should be empty')
            return false
        }
        return true
        
    }

    function handleEditButtonClick(variation){
        onOpen()
        setActionData({...actionData, 'variationId':variation.id, 'newVariationName':variation.name, 'newVariationPrice':variation.price,'oldVariationName':variation.name,'oldVariationPrice':variation.price})
    }

    function onCloseModal(){
        setActionData({...actionData, 'variationId':'', 'newVariationName':'', 'newVariationPrice':'','oldVariationName':'', 'oldVariationPrice':''})
    }


    function handleInputChange(e){
        setActionData({...actionData, [e.target.name] : e.target.value})
    }

    async function submitUpdate(formData){
        try {
            const response = await api.put(`/inventory/delicacies/edit-variation/${actionData.variationId}`, formData)
            if(response && response.status === 200){
                setRefresh(refresh + 1)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    function handleSave(e) {
        e.preventDefault()
        const valid = isValidData()
        if(valid){
            const formData = new FormData()
            formData.append('name', actionData.newVariationName)
            formData.append('price', actionData.newVariationPrice)
            formData.append('delicacy', actionData.delicacyId)

            submitUpdate(formData)
        }
    }


  return (
    <>
        <div>
            {data.name}
        </div>

        { isLoading ? <LoadingLine />: <VariationsTable handleEditButtonClick={handleEditButtonClick} variations={data.variations}/>}
        
        <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
             <form onSubmit={handleSave}>
              <ModalHeader className="flex items-center gap-1">Edit Variation<MdEdit size={30} color='#0070f0'/></ModalHeader>
              <ModalBody>
               
                <Input
                  autoFocus
                  endContent={
                    <FaBurger size={15}/>
                  }
                  label="Name"
                  name='newVariationName'
                  value={actionData.newVariationName}
                  onChange={handleInputChange}
                  variant="bordered"
                  required
                />
                <Input
                  endContent={
                    <FaPesoSign size={15}/>
                  }
                  label="Price"
                  name='newVariationPrice'
                  value={actionData.newVariationPrice}
                  onChange={handleInputChange}
                  type='number'
                  required
                  variant="bordered"
                />

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={()=>{onClose();onCloseModal()}}>
                  Close
                </Button>
                <Button type='submit' color="primary" onPress={onClose}>
                  Update
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
        </>
  )
}

export default DelicacyDetails
