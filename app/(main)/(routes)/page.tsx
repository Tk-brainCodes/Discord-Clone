import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <p className='text-2xl text-rose-500 font-semibold'>
      Discord clone <UserButton afterSignOutUrl='/' />
    </p>
  );
}
