import { Checkbox, Input } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from "react"
import { RequisitionContext } from "./AddRequisition"

const Item = ({delicacyName,delicacyId,variation}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const {selectedItems,setSelectedItems} = useContext(RequisitionContext)
    useEffect(
        ()=>{
           
            if(isSelected){
                setSelectedItems(prevItems => {
                    const delicacyExists = prevItems.find(item => item.delicacyId === delicacyId)
                    if(delicacyExists){
                        return prevItems.map(item => item.delicacyId === delicacyId ? {...item, requisitionItems : [...item.requisitionItems, {variation : variation, quantity : quantity}]} : item)
                    }else{
                        return [...prevItems, {delicacyName : delicacyName, delicacyId : delicacyId, requisitionItems : [{variation : variation, quantity : quantity}]}]
                    }
                })
            }else{
                setSelectedItems(prevItems => {
                    const updatedItems = prevItems.map(item =>
                      item.delicacyId === delicacyId
                        ? { ...item, requisitionItems: item.requisitionItems.filter(obj => obj.variation.variation_id !== variation.variation_id) }
                        : item
                    );
              
                    return updatedItems.filter(item => item.requisitionItems.length > 0);
                  });
            }
        }
    ,[isSelected])


    useEffect(()=>{
        setSelectedItems(prevItems => {return prevItems.map(item => item.delicacyId === delicacyId ? {...item, requisitionItems : item.requisitionItems.map((reqItem) =>
            reqItem.variation.variation_id === variation.variation_id
              ? { ...reqItem, quantity: quantity }
              : reqItem
          ),} : item)})
    },[quantity])
    function changeQuantity(e){
        setQuantity(e.target.value)
    }
    return(
        <div style={{'display':'flex'}}>
        <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>{variation.variation_name}</Checkbox>
        {isSelected && <Input label="Quantity" name="quantity" type="number" value={quantity} onValueChange={setQuantity}/> }
        </div>
        
    )
}

export default Item

