import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import getAllAdmins from "@/libs/getallAdmins";
import AdminItem from "@/components/moderator/AdminItem";
import { User } from "../../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddButtonAdmin from "@/components/moderator/AddButtonAdmin";

interface Props{
  params: {id: string};
}
type SortOrder = {
  [key: string]: number;
};

export default async function ModeratorPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const allUsers_obeject = await getAllAdmins(session.user.token);
  const usersdata = allUsers_obeject.data;
  
const sortOrder: SortOrder = {
  moderator: 0,
  admin: 1,
  user: 2,
};

const sortedUsers = usersdata.sort(
  (a:any, b:any) => sortOrder[a.role] - sortOrder[b.role]
);



  return (
    <div className="p-4">
      {" "}
      {/* Add padding for spacing */}
      <div className="text-2xl font-bold mb-4">List of Admins</div>
      {/* Search box and Add button */}
      {/* <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          fullWidth 
        />
        <AddButtonAdmin/>
      </Stack> */}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Create Date
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedUsers.map((eachadmin: User) => (
              <AdminItem admin={eachadmin} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
