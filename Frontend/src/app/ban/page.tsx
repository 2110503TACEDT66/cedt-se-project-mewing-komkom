import ModalBanHandle from "@/components/ban/ModalBanHandler";
import getAllUser from "@/libs/getUsers";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Ban() {
  const session = await getServerSession(authOptions);
  const users = await getAllUser(session!.user.token);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold">List of users</h1>

      <input
        type="text"
        className="bg-[#E1E7EA] rounded-lg py-2 px-4 w-80 mt-3 mb-10"
        placeholder="Search"
      />
      <div className="flex flex-col bg-white p-4 rounded-2xl">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text">
                <thead className="border-b border-neutral-200 font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>{" "}
                    <th scope="col" className="px-6 py-4">
                      Tel
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Ban Until
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.data
                    .filter((item: any) => item.role == "user")
                    .map((item: any) => (
                      <tr className="border-b border-neutral-200">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.tel}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.banUntil}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <ModalBanHandle data={item} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
