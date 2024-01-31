"use client";

import { Fragment } from "react";
import { format } from "date-fns";
import { Member, Message, Profile } from "@prisma/client";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";

import ChatWelcome from "./chat-welcome";
import ChatItems from "./chat-items";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface ChatMessageProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, any>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

type MessageWithMembersWithProfiles = Message & {
  member: Member & {
    profile: Profile;
  };
};

const ChatMessage = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessageProps) => {
  const queryKey = `chat:${chatId}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  if (status === "pending") {
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <Loader2 className='h-7 w-7 text-zinc-500 animate-spin' />
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <ServerCrash className='h-7 w-7 text-zinc-500' />
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>
          Something went wrong
        </p>
      </div>
    );
  }

  return (
    <div
      className='flex-1 flex-col py-4 overflow-auto
  '
    >
      <div className='flex-1'>
        <ChatWelcome type={type} name={name} />
        <div className='flex flex-col-reverse mt-auto'>
          {data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group.items.map((message: MessageWithMembersWithProfiles) => (
                <div key={message.id}>
                  <ChatItems
                    key={message.id}
                    id={message.id}
                    member={message.member}
                    currentMember={member}
                    content={message.content}
                    fileUrl={message.fileUrl}
                    deleted={message.deleted}
                    timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                    isUpdated={message.createdAt !== message.updatedAt}
                    socketUrl={socketUrl}
                    socketQuery={socketQuery}
                  />
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
