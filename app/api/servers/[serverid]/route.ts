import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface ReqServerProps {
  name: string;
  imageUrl: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: { serverid: string } }
) {
  const profile = await currentProfile();
  const { name, imageUrl }: ReqServerProps = await req.json();

  if (!profile) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const server = await db.server.update({
      where: {
        id: params.serverid,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
