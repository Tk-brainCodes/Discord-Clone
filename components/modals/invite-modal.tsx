"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCcw, Check } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";

const InviteModal = () => {
  const { isOpen, type, onClose, data, onOpen } = useModal();
  const { server } = data;
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const generateNewLink = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen("invite", { server: response.data });
    } catch (errors) {
      console.log(errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl font-bold text-center'>
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className='p-6'>
          <Label className='uppercase  text-xs font-bold text-zinc-500 dark:text-secondary/70'>
            Server invite link
          </Label>
          <div className='flex items-center mt-2 gap-x-2'>
            <Input
              disabled={loading}
              className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
              value={inviteUrl}
            />
            <Button disabled={loading} onClick={onCopy} size='icon'>
              {copied ? (
                <Check className='w-4 h-4' />
              ) : (
                <Copy className='w-4 h-4' />
              )}
            </Button>
          </div>
          <Button
            onClick={generateNewLink}
            variant='link'
            size='sm'
            className='text-xs text-zinc-500 mt-4'
          >
            Generate a new link
            <RefreshCcw className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
