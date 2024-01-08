"use client";

import CreateServerModal from "@/components/modals/create-server-modal";
import InviteModal from "@/components/modals/invite-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import ManageMembers from "../modals/manage-members";
import { useState, useEffect } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  //prevent the modal from loading in the server side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <ManageMembers />
    </>
  );
};
