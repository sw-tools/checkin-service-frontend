import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

type ProfileImageProps = {
  url: string;
};

const ProfileImage = ({ url }: ProfileImageProps) => {
  return (
    <div className="rounded-full border-2 border-white">
      <Image src={url} alt="Profile image" height={48} width={48} />
    </div>
  );
};

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav>
      <div className="navbar bg-base-100 shadow-xl rounded-box">
        <div className="navbar-start">
          <Link
            className="btn btn-ghost normal-case text-xl hover:no-underline"
            href="/checkins"
          >
            Southwest Tools
          </Link>
        </div>
        <div className="navbar-end">
          {!session ? (
            <div className="btn" onClick={() => signIn()}>
              Login
            </div>
          ) : (
            <>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle overflow-hidden avatar"
                >
                  <div className="w-10 rounded-full">
                    {session.user?.image ? (
                      <Image
                        src={session.user?.image}
                        layout="fill"
                        alt="Profile image"
                      />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a onClick={() => signOut()}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
