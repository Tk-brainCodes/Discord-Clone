import React from "react";

import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";

import ServerHeader from "./server-header";

interface ServerSideProps {
  serverId: string;
}

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

  const memebers = server?.members.filter(
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
    </div>
  );
};

export default SeverSidebar;
