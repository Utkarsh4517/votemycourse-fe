"use client";

import React from "react";
import Image from "next/image";

export default function OnlyFansPage() {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <Image
        src="https://media1.tenor.com/m/4YDZfwNpjwAAAAAd/pogled-pas.gif"
        alt="Pogled Pas GIF"
        width={800}
        height={800}
        className="max-h-screen max-w-screen object-cover"
      />
    </div>
  );
}