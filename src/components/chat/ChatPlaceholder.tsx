import React from "react";
import AddTokenModal from "./../auth/AddTokenModal";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";

type Props = {};


export default function ChatPlaceholder({}: Props) {
  const { token } = useAuth();
  return ( 
    <div className="flex h-full w-full items-center justify-center">
      <div className="max-w-3xl p-4 text-center text-primary">
        <h1 className="text-4xl font-medium">QQQQ.GAMES</h1>
        <p className="mt-4 text-lg">
          {" "} 
          <Link
            href="/playground"
            className="font-medium text-primary hover:underline"
          >
            Playground
          </Link> for the next generation of AI-powered
        </p>
        {!token && (
        <div className="m-4 flex items-center justify-center">
          <AddTokenModal />
        </div>)
        }
      </div>
    </div>
  );
}
