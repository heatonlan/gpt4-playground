import React, { PureComponent } from 'react'
import ReactDiffViewer from 'react-diff-viewer'
import AddTokenModal from "./../auth/AddTokenModal";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";

type Props = {};


export default function ChatPlaceholder({}: Props) {
  const { token } = useAuth();
  const oldCode = `diff_test: what is your favorate game?`
  const newCode = "test_diff: my favorate game is chess"

  return ( 
    <div className="flex h-full w-full items-center justify-center">
      <div className="max-w-3xl p-4 text-center text-primary">
        <h1 className="text-4xl font-medium">QQ.services</h1>
        <p className="mt-4 text-lg">
          {" "} 
          <Link
            href="/playground"
            className="font-medium text-primary hover:underline"
          >
            Experience the next-gen services empowered by AI now
          </Link>
        </p>
        <ReactDiffViewer
        oldValue={oldCode}
        newValue={newCode}
        splitView={true}
        />
        {!token && (
        <div className="m-4 flex items-center justify-center">
          <AddTokenModal />
        </div>)
        }
      </div>
    </div>
  );
}
