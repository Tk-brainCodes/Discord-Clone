import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";

import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessage from "@/components/chat/chat-message";
import MediaRoom from "@/components/media-room";

interface ChannelIdPageProps {
  params: {
    serverid: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();
  const channelId =
    params.channelId === undefined
      ? "aa2c27c4-b21a-40e3-afcd-102f0778dec0"
      : params.channelId;

  const serverId =
    params.serverid === undefined
      ? "aa2c27c4-b21a-40e3-afcd-102f0778dec0"
      : params.serverid;

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const members = await db.member.findFirst({
    where: {
      serverId: serverId,
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
        serverId={serverId}
        type='channel'
        imageUrl=''
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessage
            member={members}
            name={channel.name}
            chatId={channelId}
            type='channel'
            apiUrl='/api/messages'
            socketUrl='/api/socket/messages'
            socketQuery={{
              channelId: channelId,
              serverId: serverId,
            }}
            paramKey='channelId'
            paramValue={channelId}
          />

          <ChatInput
            name={channel.name}
            type='channel'
            apiUrl='/api/socket/messages'
            query={{ channelId: channelId, serverId: serverId }}
          />
        </>
      )}

      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channelId} audio={true} video={false} />
      )}

      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channelId} audio={true} video={true} />
      )}
    </div>
  );
};

export default ChannelIdPage;
