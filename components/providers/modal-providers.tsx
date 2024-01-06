"use client"

import CreateServerModal from "@/components/modals/create-server-modal"
import { useState, useEffect } from "react"


export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  //prevent the modal from loading in the server side
   useEffect(() => {
    setIsMounted(true);
   }, [])

  if(!isMounted){
    return null
  }
    return (
        <>
        <CreateServerModal/>
        </>
    )
}