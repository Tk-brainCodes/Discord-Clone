"use client";

import { useState, useEffect } from "react";

import CreateServerModal from "@/components/modals/create-server-modal";
import InviteModal from "@/components/modals/invite-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import ManageMembers from "@/components/modals/manage-members";
import CreateChannelModal from "@/components/modals/create-channel";
import LeaveChannel from "@/components/modals/leave-channel";
import DeleteServer from "@/components/modals/delete-server";
import DeleteChannelModal from "@/components/modals/delete-channel-modal";
import EditChannelModal from "@/components/modals/edit-channel-modal";
import MessageFileModal from "../modals/message-file-modal";
import DeleteMessageModal from "@/components/modals/delete-message-modal";

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
      <DeleteServer />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
