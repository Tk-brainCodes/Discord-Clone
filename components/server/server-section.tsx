"use client";

import { ChannelType, MemberRole } from "@prisma/client";
import { ServerWithMembersWithProfiles } from "@/types";

import ActionTooltip from "@/components/action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  label: string;
  role: MemberRole | undefined;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

const ServerSection = ({
  label,
  role,
  sectionType,
  server,
  channelType,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className='flex items-center justify-between py-2'>
      <p className='text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400'>
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label='Create Channel' side='top'>
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 transition'
          >
            <Plus className='h-4 w-4' />
          </button>
        </ActionTooltip>
      )}

      {role == MemberRole.GUEST && sectionType === "members" && (
        <ActionTooltip label='Manage Members' side='top'>
          <button
            onClick={() => onOpen("manageMembers", { server })}
            className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 transition'
          >
            <Settings className='h-4 w-4' />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
