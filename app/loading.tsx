"use client";

import { useEffect, useState } from "react";
import { DiscordAnimation } from "@/assets";
import Image from "next/image";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      {loading && (
        <Image src={DiscordAnimation} alt='discord-animation' className='' />
      )}
    </div>
  );
};

export default LoadingScreen;
