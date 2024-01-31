import React, { useEffect } from 'react'
import Item from './Item'

const ListItems = ({requisitionId}) => {
    const [requisitionItems, setRequisitionItems] = useState([])

    useEffect(() => {
        // async function fetchRequisitionItems
    },[])

  return (
    <>
    <table>
        <thead>
            <tr>
                <th>Requisition Code</th>
                <th>Variation</th>
                <th>Delicacy</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
                {requisitionItems.map((requisitionItem) => {
                return <Item requisitionItem={requisitionItem}/>
            })}  
        </tbody>

    </table>
      
   </>
  )
}

export default ListItems
