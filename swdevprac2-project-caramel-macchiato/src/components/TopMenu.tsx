import Image from "next/image";
import Link from "next/link";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SiStarship } from "react-icons/si";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  var profile;

  if (session) {
    profile = await getUserProfile(session.user.token);
  }

  return (
    <div className="flex justify-between items-center px-7 py-4 top-0 fixed z-10 bg-bg w-full">
      <div className="flex gap-5 items-center">
        <Link href="/">
          <SiStarship className="text-blue-500" size={40} />
        </Link>

        {/* <TopMenuItem title="จองเลย" href="/booking" /> */}
      </div>
      <div className="flex gap-4 items-center">
        {session ? (
          <>
            <p>Welcome {profile.data.name}</p>
            <TopMenuItem title="การจองของคุณ" href="/booking/manage" />
          </>
        ) : (
          <TopMenuItem title="Sign-Up" href="/register" />
        )}

        <TopMenuItem
          title={session ? "Sign-Out" : "Sign-In"}
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
        />
      </div>
    </div>
  );
}
