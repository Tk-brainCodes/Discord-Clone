"use client";

import CreateServerModal from "@/components/modals/create-server-modal";
import InviteModal from "@/components/modals/invite-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import ManageMembers from "@/components/modals/manage-members";
import CreateChannelModal from "@/components/modals/create-channel";
import LeaveChannel from "@/components/modals/leave-channel";
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
      <CreateChannelModal />
      <LeaveChannel />
    </>
  );
};
