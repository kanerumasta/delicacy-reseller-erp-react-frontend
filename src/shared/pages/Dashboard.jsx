import React from 'react'
import {Row, Column} from '../../shared/components/Utils'
import {Card, CardHeader,CardBody,CardFooter, Button, Spacer} from '@nextui-org/react'
import { BsFillInboxesFill } from "react-icons/bs";
const Dashboard = () => {

 
  return (
    <Row>
        <Column>
          <Column>
            <Row x='flex-start'>
                <h3>Stock Overview</h3>
            </Row>
            <Row height="200px" x='space-between'>
                  <Card style={{'height':'90%', 'width':'90%', 'margin':'10px'}}>
                        <CardHeader>
                              <Button size='lg' color='secondary' isIconOnly><BsFillInboxesFill size={20}/></Button>
                              <Spacer x={2}/>
                              <h2>Stocks</h2>
                        </CardHeader>
                        <CardBody>
                              
                        </CardBody>
                        <CardFooter>
                          
                        </CardFooter>
                  </Card>
                  <Card style={{'height':'90%', 'width':'90%', 'margin':'10px'}}>
                        <CardHeader>
                              <h2></h2>
                        </CardHeader>
                        <CardBody>
                              
                        </CardBody>
                        <CardFooter>
                          <Button color='primary'>Hey</Button>
                        </CardFooter>
                  </Card>
                  <Card style={{'height':'90%', 'width':'90%', 'margin':'10px'}}>
                        <CardHeader>
                              <h2></h2>
                        </CardHeader>
                        <CardBody>
                              
                        </CardBody>
                        <CardFooter>
                          <Button color='primary'>Hey</Button>
                        </CardFooter>
                  </Card>
            </Row>
            <Row bg="#fff" style={{'border-radius': '8px'}} height="300px"><h1>BOT</h1></Row>
          </Column>
        </Column>
        <Column  width="70%">

        </Column>
    </Row>
    
  )
}

export default Dashboard
