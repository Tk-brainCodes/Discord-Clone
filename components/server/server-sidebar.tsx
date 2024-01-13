import React from "react";

import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, Mic, Video, ShieldAlert, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import ServerHeader from "./server-header";
import ServerSearch from "./server-search";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";

interface ServerSideProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className='mr-2 w-4 h-4' />,
  [ChannelType.AUDIO]: <Mic className='mr-2 w-4 h-4' />,
  [ChannelType.VIDEO]: <Video className='mr-2 w-4 h-4' />,
};

const roleIcon = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className='mr-2 w-4 h-4 text-indigo-500' />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className='mr-2 w-4 h-4 text-rose-500' />,
};

const SeverSidebar = async ({ serverId }: ServerSideProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true, //each member should have a profile
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  //filter all the channels relating to text
  const textChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  //filter all the channels relating to video
  const videoChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  //filter all the channels relating to audio
  const audioChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
      <ServerHeader server={server} role={role} />
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannel?.map((channel) => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannel?.map((channel) => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannel?.map((channel) => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  icon: roleIcon[member.role],
                  name: member.profile.name,
                  id: member.id,
                })),
              },
            ]}
          />
        </div>
        <Separator className='bg-zinc-200 dark:bg-zinc-600 rounded-md my-2' />

        {!!textChannel?.length && (
          <div className='mb-2'>
            <ServerSection
              sectionType='channels'
              channelType={ChannelType.TEXT}
              role={role}
              label='Text Channel'
            />
            {textChannel.map((channel) => (
              <>
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              </>
            ))}
          </div>
        )}
        {!!audioChannel?.length && (
          <div className='mb-2'>
            <ServerSection
              sectionType='channels'
              channelType={ChannelType.AUDIO}
              role={role}
              label='Audio Channel'
            />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
export default SeverSidebar;
