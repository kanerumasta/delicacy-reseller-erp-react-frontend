import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../shared/api'
import Loading from '../../../shared/components/Loading'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button, useNavbar, Spacer, Progress } from '@nextui-org/react'
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { LoadingContext } from '../../../shared/pages/Layout'
import {useAsyncList} from "@react-stately/data";
import LoadingLine from '../../../shared/components/LoadingLine'
import Error from '../../../shared/components/Error'
import {formatName} from '../../../shared/utils'


const RequisitionItems = () => {
    const {requisitionCode} = useParams()
    const [items, setItems] = useState([])
    const [requisitionDetails, setRequisitionDetails] = useState([])
    const [requisitionId, setRequisitionId] = useState(null)
    const [isError, setIsError] = useState(null)
    const [statusMessage, setStatusMessage] = useState('')
    const [isLoading,setIsLoading] = useState(true)
    const [loadingAction, setLoadingAction] = useState(false)
    const navigate = useNavigate()

    
    useEffect(()=>{

      async function getRequisition(id){
        try{
            const response = await api.get(`requisition/${id}`)
            setRequisitionDetails(response.data)
            console.log(response.data)
        }catch(error){
          console.error(error)
        }
      }
      
      async function fetchData(){
        try {
          const response = await api.get(`requisition/items/${requisitionCode}`)
          if(response && response.status){
            console.log(response.data)
            setItems(response.data)
            setRequisitionId(response.data[0].requisition.id)
            getRequisition(response.data[0].requisition.id)
            setIsLoading(false)
          }
        } catch (error) {
          console.error(error)
        }finally {
         
          setIsLoading(false); 
          
        }
       
      }

      fetchData()
     
    },[])

    async function handleApprove(){
      setLoadingAction(true)
      try {
        
        const response = await api.patch(`/requisition/${requisitionId}/approve`,{comment : "hey default comment"})
        setStatusMessage("Successfully approve requisition!")
        setIsError(false)
        setTimeout(()=>{setIsError(null)}, 3000)

      } catch (error) {
        console.error(error)
        if(error.response?.status === 400){
          if(error.response?.data?.detail === "approved") setStatusMessage("This requisition is already approved")
          else if (error.response?.data?.detail === "rejected") setStatusMessage("This requisition is already rejected")
          setIsError(true)
          setTimeout(()=>{setIsError(null)}, 3000)
        }
      }finally{
        setLoadingAction(false)
      }
      
    }
    async function handleReject(){
      setLoadingAction(true)
      try {
        const response = await api.patch(`/requisition/${requisitionId}/reject`,{comment : "hey default comment"})
        console.log(response)
        setStatusMessage("Requisition Rejected!")
        setIsError(false)
        setTimeout(()=>{setIsError(null)}, 3000)
      } catch (error) {
        console.error(error)
        if(error.response?.status === 400){
          if(error.response?.data?.detail === "approved") setStatusMessage("This requisition is already approved")
          else if (error.response?.data?.detail === "rejected") setStatusMessage("This requisition is already rejected")
          setIsError(true)
          setTimeout(()=>{setIsError(null)}, 3000)
        }
      }finally{
        setLoadingAction(false)
      }
      
    }

  return (
    
    <div>
        {isError === true && <Error isError = {true} message={statusMessage}/>}
        {isError === false && <Error isError = {false} message={statusMessage}/>}
        {isLoading && <LoadingLine/>}
        {loadingAction && <Progress isIndeterminate size="sm" className='w-full' />}
            <Spacer y={4}/>
            <Button startContent={<IoCaretBackCircleOutline size={30}/>} variant='flat' color='secondary' onPress={()=>navigate(-1)} radius='full' >
                Back
            </Button>
            <Spacer y={4}/>
            
            <div><span>Requisition Code     :</span><span>{requisitionDetails.requisition_code}</span></div>
            <div><span>Date of Requisition  :</span><span>{requisitionDetails.created_at}</span></div>
            <div><span>Requester            :</span><span>{requisitionDetails.requester?formatName(requisitionDetails.requester.first_name, requisitionDetails.requester.last_name) : 'N/A'}</span></div>
            <div><span>Status               :</span><span>{requisitionDetails.approval_status}</span></div>
            <div><span>Description          :</span><span>{requisitionDetails.description}</span></div>

            <Table>
              <TableHeader>
                <TableColumn>DELICACY</TableColumn>
               <TableColumn>VARIATION</TableColumn>
                  <TableColumn>QUANTITY</TableColumn>
                  
              </TableHeader>
              <TableBody emptyContent="No items in this requisition" items={items}>
                  {item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.variation.delicacy.name}</TableCell>
                        <TableCell>{item.variation.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>

            <Spacer y={4}/>
            {requisitionDetails.approval_status === 'pending' && <div><Button color='success' onPress={handleApprove}>Approve</Button>
            <Button onPress={handleReject}>Reject</Button></div>}
            {requisitionDetails.approval_status === 'approved' && <div>
              <Button onPress = {()=> navigate(`/purchasing/create-purchase-order/${requisitionId}`)}>
                  Create Purchase Order
              </Button>
            </div>}
  
    </div>
  )
}

export default RequisitionItems
