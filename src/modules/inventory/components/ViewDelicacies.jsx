import { api } from "../../../shared/api";
import React ,{ useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../shared/components/Loading";
import { Textarea,Button, Card, CardBody, CardFooter, Divider, Image, Spacer,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,useDisclosure, Input } from "@nextui-org/react";

import { MdAdd } from "react-icons/md";
import styled from "styled-components";
import { FaCloudUploadAlt } from "react-icons/fa"
import Axios from 'axios'
import { VscRefresh } from "react-icons/vsc";
import { isAdminUser } from "../../../shared/utils";
import { DelicacyCard } from "./Utils";

const FileInputContainer = styled.button`
display:flex;
flex-direction : column;
justify-content:center;
align-items:center;
height : 150px;
width : 150px;
border : 2px dashed blue;
overflow:hidden;
border-radius: 8px;
`
const FileInput = styled.input`
  width: 100%;
  height : 100%;
`



export const ViewDelicacies = () => {
  const fileRef = useRef()

  const [image, setImage] = useState(null)
  const [delicacyName, setDelicacyName] = useState('')
  const [delicacyDescription, setDelicacyDescription] = useState('')

  //ADD DEFAULT IMAGE URL HEREEEEE
  let delicacyUrl = "https://res.cloudinary.com/difger2cq/image/upload/v1702473537/t5a8sst13czzzdfpvtgq.jpg"
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [ready, setReady] = useState(false);
  const [delicacies, setDelicacies] = useState([]);
  const [delicacyNamesList, setDelicacyNamesList] = useState([])
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate()



  useEffect(() => {
    const fetchDelicacies = async () => {
      const res = await api.get("inventory/delicacies");
      if (res && res.status && res.status === 200) {
        
        setDelicacyNamesList(res?.data?.map((delicacy) => delicacy.name.toLowerCase()))
        setDelicacies(res.data);
        setReady(true);
      }
      
    };
    fetchDelicacies();
  }, [,refresh]);




 function isDelicacyNameTaken(name){
    return delicacyNamesList.includes(name.toLowerCase().trim())
  }

const isInvalidName = React.useMemo(
  ()=>{
    if (delicacyName === "") return false;
    const isTaken = isDelicacyNameTaken(delicacyName)
    return isTaken
  }
,[delicacyName])


   function isValidData(){
    if(delicacyName === '' && delicacyDescription === ''){
        console.log('All fields is required')
        return false
    }
    if(isInvalidName) return false;
    return true
  }

  async function uploadImage(){
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'koziemac')
    try {
        const response = await Axios.post("https://api.cloudinary.com/v1_1/difger2cq/image/upload", formData);

        if (response.status >= 200 && response.status < 300) {
            console.log('uploaded')
            console.log(response.data.secure_url)
            delicacyUrl = response.data.secure_url
        }
    } catch (error) {
        console.error(error)
    }
  }

  async function handleSubmit(e){
      e.preventDefault()
      console.log('haha submit na k')
      console.log(image)
      if(image) 
        await uploadImage()

      const isValid = isValidData()
      
      if(isValid){
        
        const formData = new FormData()
        formData.append('name', delicacyName)
        formData.append('description', delicacyDescription)
        formData.append('image_url', delicacyUrl)

        try {
          const response = await api.post('inventory/delicacies', formData)
          if(response && response.status === 201){
              console.log('success')
          }
        } catch (error) {
          console.error(error)
        }

      }

    }

  function fileButtonClicked(e){

      fileRef.current.click()

  }

  function clickRefresh(){
    setReady(false)
    setRefresh(refresh + 1)
  }

  return (
    <>
    {ready ?
    <div>    
      <Spacer y={6}/>
      <div style={{'paddingRight' : '75px'}} className="w-full flex items-center justify-between px-4">
        <Button onPress={()=>{isAdminUser()}}>Get token</Button>
        <Button isIconOnly radius="full" variant="light" onPress={clickRefresh} startContent={<VscRefresh size={30}/>}></Button>
        <Button onPress={onOpen} variant="shadow" color="primary" endContent={<MdAdd size={30} color="#fff"/>}>Add New</Button> 
      </div>
      <Spacer y={8}/>           
      <Divider />
    
      
      <div className="overflow-y-auto m-3 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {delicacies.map((item) => (
          <DelicacyCard item={item} />
        ))}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                
                <Input 
                    label='Delicacy name'
                    size="lg"
                    variant="bordered"
                    isInvalid={isInvalidName}
                    color={isInvalidName ? "danger" : "success"}
                    errorMessage={isInvalidName && "Delicacy already exists"}
                                labelPlacement="outside"
                    name = "delicacyName"
                    value={delicacyName}
                    onValueChange={setDelicacyName}
                    isClearable
    
                />
                <Textarea
                    variant="bordered"
                    color = "success"
                    name = "delicacyDescription"
                    value={delicacyDescription}
                    onValueChange={setDelicacyDescription}
                    
                    labelPlacement="outside"
                    placeholder="Enter delicacy description"
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                />
                <div style={{'display':'flex'}}>
                    <FileInputContainer type='button' onClick={fileButtonClicked}>
                        <FileInput  ref={fileRef} hidden accept="image/*" type="file" name="image" onChange={(e)=>setImage(e.target.files[0])} />
                        <FaCloudUploadAlt color='#572ff5' size={50}/>
                        <span>Upload Image</span>
                    </FileInputContainer>
                   
                    {image &&
                    <Image
                      width={200}
                      alt="NextUI hero Image"
                      src={URL.createObjectURL(image)}
                    />            
                    }
                </div>

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </div> 
      </div>

   : <Loading/>}
  
  </>

  );
};
