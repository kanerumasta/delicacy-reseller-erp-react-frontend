import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../shared/api'


const CreatePurchaseOrder = () => {
	const { requisitionId } = useParams()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(()=>{
		async function getRequisitionDetails(){
			try {
				const response = await api.get('/requisition/')
			} catch (error) {
				
			}
		}
		getRequisitionDetails()
	},[])

  return (
	<div>
	  <h1>Create</h1>
	</div>
  )
}

export default CreatePurchaseOrder
