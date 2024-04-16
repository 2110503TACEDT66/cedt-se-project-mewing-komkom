import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import Space from "@/db/models/WorkingSpace";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const addSpace = async (addWorkingSpaceForm:FormData)=>{
        'use server'
        const model = addWorkingSpaceForm.get("model")
        const address = addWorkingSpaceForm.get("address")
        const picture = addWorkingSpaceForm.get("picture")
        const tel = addWorkingSpaceForm.get("tel")
        const openTime = addWorkingSpaceForm.get("openTime")
        const closeTime = addWorkingSpaceForm.get("closeTime")

        try{
            await dbConnect()
            const space = await Space.create({
                "model":model,
                "address":address,
                "picture":picture,
                "tel":tel,
                "openTime":openTime,
                "closeTime":closeTime
            })
        }catch(error){
            console.log(error)
        }
        revalidateTag("co-working spaces")
        redirect("/space")
    }

  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  var createdAt = new Date(profile.data.createdAt);

  return (
    <main className="bg-slate-100 m-5 p-5">
      <div className="text-2xl"> {profile.data.name}</div>
      <table className="table-auto border-separate border-spacing-2">
        <tbody>
          <tr>
            <td> Email </td>
            <td> {profile.data.email} </td>
          </tr>
          <tr>
            <td> Tel. </td>
            <td> {profile.data.tel} </td>
          </tr>
          <tr>
            <td> Role </td>
            <td> {profile.data.role} </td>
          </tr>
          <tr>
            <td> Member Since </td>
            <td> {createdAt.toString()} </td>
          </tr>
          
        </tbody>
      </table>

      {/* {profile.data.role == "admin" ? (
        <form action={addSpace}>
          <div className="text-xl text-blue-600"> Create Co-working Sapce</div>
          <div className="flex items-center w-1/2 my-2">
            <label className="w-auto block text-gray-700 pr-4" htmlFor="model">
              Co-working Space
            </label>
            <input
              type="text"
              required
              id="model"
              name="model"
              placeholder="Co-working Space"
              className="bg-white border-2 border-gray-200 rounded w-full p-2
                    text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          
          <div className="flex items-center w-1/2 my-2">
            <label className="w-auto block text-gray-700 pr-4" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              required
              id="address"
              name="address"
              placeholder="address"
              className="bg-white border-2 border-gray-200 rounded w-full p-2
                    text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex items-center w-1/2 my-2">
            <label
              className="w-auto block text-gray-700 pr-4"
              htmlFor="picture"
            >
              Picture
            </label>
            <input
              type="text"
              required
              id="picture"
              name="picture"
              placeholder="URL"
              className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex items-center w-1/2 my-2">
            <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">
              tel
            </label>
            <input
              type="tel"
              required
              id="tel"
              name="tel"
              placeholder="tel"
              className="bg-white border-2 border-gray-200 rounded w-auto p-2
text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex items-center w-1/2 my-2">
            <label className="w-auto block text-gray-700 pr-4" htmlFor="openTime">
              Open Time
            </label>
            <input
              type="openTime"
              required
              id="openTime"
              name="openTime"
              placeholder="10.00"
              min={5}
              max={5}
              className="bg-white border-2 border-gray-200 rounded w-auto p-2
text-gray-700 focus:outline-none focus:border-blue-400"
            />

            <label className="w-auto block text-gray-700 pr-4" htmlFor="closeTime">
              Close Time
            </label>
            <input
              type="closeTime"
              required
              id="closeTime"
              name="closeTime"
              placeholder="19.30"
              min={5}
              max={5}
              className="bg-white border-2 border-gray-200 rounded w-auto p-2
text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
          <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                    shadow-sm text-white" type="submit">
                        Submit
                    </button>
        </form>
        
      ) : null}
*/}
    </main>
  ); 
}
