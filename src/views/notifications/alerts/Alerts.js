import React,{useContext, useEffect, useState} from 'react'
import {
  CAlert,
  CAlertHeading,
  CAlertLink,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import { GlobalContext } from '../../../context'
const Alerts = () => {

  const { users, auth} = useContext(GlobalContext);
 
 var StoreAlert= JSON.parse(localStorage.getItem("count"))
 var namess= JSON.parse(localStorage.getItem("name"))
  return (
    <CRow>
    
      
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader >
            <div className='d-flex justify-content-between'>
            <strong>Recent Alerts ( It only works when the administrator uses the admin panel. )</strong>
            <button style={{color:'white', backgroundColor:"red", border:'4px solid red'}} onClick={()=>{localStorage.removeItem("count"),localStorage.removeItem("name")}}>Remove All</button>
            </div>
          </CCardHeader>
          <CCardBody>
          {
            StoreAlert?.map((e)=>
            e!==auth?.user?._id?
            <CAlert
            color="warning"
            dismissible
            onClose={() => {
              alert("👋 Well, hi there! Thanks for dismissing me.");
            }}
          >
           
            <strong>{users.forEach(element => {
               return element._id===e&&element._id!==auth?.user?._id?localStorage.setItem("name",JSON.stringify(element.name)):""
            })}{namess} has sent the message.</strong>
            
          </CAlert>:""
          )
}
             
           
          </CCardBody>
        </CCard>
      </CCol>
      
      
    </CRow>
  )
}

export default Alerts
