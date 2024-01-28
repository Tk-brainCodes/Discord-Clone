import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";

interface ChannelIdPageProps {
  params: {
    serverid: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const members = await db.member.findFirst({
    where: {
      serverId: params.serverid,
      profileId: profile?.id,
    },
  });

  if (!profile) {
    return redirectToSignIn();
  }

  if (!channel || !members) {
    return redirect("/");
  }

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader
        name={channel?.name}
        serverId={channel?.serverId}
        type='channel'
        imageUrl=''
      />
      <div className='flex-1'>Feauture Messages</div>
      <ChatInput
        name={channel.name}
        type='channel'
        apiUrl='/api/socket/messages'
        query={{ channelId: channel.id, serverId: channel.serverId }}
      />
    </div>
  );
};

export default ChannelIdPage;
