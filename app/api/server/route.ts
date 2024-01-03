import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[SERVER_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
