import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface ReqServerProps {
  name: string;
  imageUrl: string;
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverid: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverid) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverid,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
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
