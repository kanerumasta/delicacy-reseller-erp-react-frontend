import React from 'react'
import {Button} from "@nextui-org/react";
import { MdAdd } from 'react-icons/md';
const PurchaseOrders = () => {
  return (
    <div>
      <Button color="primary" endContent={<MdAdd/>}>Create New Order</Button>
      <h1>Purchase Orders</h1>
    </div>
  )
}

export default PurchaseOrders
