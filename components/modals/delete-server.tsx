"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteServer = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { server } = data;
  const isModalOpen = isOpen && type === "deleteServer";

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const onConfirmDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push("/");
      {
        pathname === `/server/${server?.id}` ? window.location.reload() : "";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl font-bold text-center'>
            Delete Server
          </DialogTitle>
          <DialogDescription className='text-center flex flex-col items-center justify-center gap-2 text-zinc-500'>
            Are you sure you want to do this? <br />
            <div className='flex gap-2'>
              <span className='font-semibold text-indigo-500'>
                {server?.name}
              </span>
              will be permanently deleted
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Button disabled={isLoading} variant='ghost' onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant='primary'
              onClick={onConfirmDelete}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServer;
