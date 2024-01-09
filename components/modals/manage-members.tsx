"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerWithMembersWithProfiles } from "@/types";
import {
  ShieldCheck,
  ShieldAlert,
  MoreVertical,
  ShieldQuestion,
  Shield,
  Check,
  Gavel,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import UserAvatar from "@/components/user-avatar";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className='h-4 w-4 ml-2 text-indigo-500' />,
  ADMIN: <ShieldAlert className='h-4 w-4 ml-2 text-rose-500' />,
};

const MembersModal = () => {
  const { isOpen, type, onClose, data, onOpen } = useModal();
  const [loadingId, setLoadingId] = useState("");
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const isModalOpen = isOpen && type === "manageMembers";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl font-bold text-center'>
            Manage members
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            {server?.members.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='mt-0 max-h-[420px] pr-6'>
          {server?.members.map((member) => (
            <div key={member.id} className='flex items-center gap-x-2 mb-6'>
              <UserAvatar src={member.profile.imageUrl} />
              <div className='flex flex-col gap-y-1'>
                <div className='text-xs font-semibold flex items-center'>
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className='text-xs text-zinc-500'>{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className='ml-auto'>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className='h-4 w-4 text-zinc-500' />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side='left'>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className='flex items-center'>
                            <ShieldQuestion className='w-4 h-4 mr-2' />
                            <span>Role</span>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                  <Shield className='w-4 h-4 mr-2' />
                                  Guest
                                  {member.role === "GUEST" && (
                                    <Check className='w-4 h-4 ml-4' />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ShieldCheck className='w-4 h-4 mr-2' />
                                  Moderator
                                  {member.role === "MODERATOR" && (
                                    <Check className='w-4 h-4 ml-4' />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSubTrigger>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Gavel className='w-4 h-4 mr-2' />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className='w-4 h-4 animate-spin ml-auto text-zinc-500' />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
