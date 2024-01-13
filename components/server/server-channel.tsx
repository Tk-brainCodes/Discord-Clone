"use client";

import { useParams, useRouter } from "next/navigation";

import { Channel, Server, MemberRole, ChannelType } from "@prisma/client";
import { Hash, Mic, Video } from "lucide-react";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role: MemberRole | undefined;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();

  return <div>ServerChannel</div>;
};

export default ServerChannel;
