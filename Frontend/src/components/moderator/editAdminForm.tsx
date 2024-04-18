'use client'
import { TextField } from "@mui/material";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getAllUser from "@/libs/getUsers";
import getAllAdmins from "@/libs/getallAdmins";
import AdminItem from "./AdminItem";

export default function EditAdminForm({adminID,adminData}:{adminID:string,adminData:any}){
    
    return(
        <div>
            <form action="" className="p-5 bg-white">
        <table className="border-separate border-spacing-x-10 table-fixed rounded-md"
        cellPadding={5} cellSpacing={5}>
            <tbody>
                <tr>
                    <td className="w-32">
                        <label> 
                        Picture URL:
                        </label> 
                    </td> 
                    <td > 
                        <Input
                            type="text"
                            placeholder="profile's picture URL"
                            className="col-span-3  "
                            maxLength={25}
                            id="profile_picture"
                            />
                    </td>
                </tr>
                <tr>
                    <td> 
                        <label> 
                        ชื่อ:
                        </label> 
                    </td> 
                    <td>
                        
                        <Input
                            type="text"
                            placeholder="name"
                            className="col-span-3 "
                            maxLength={25}
                            id="admin_name"
                            value={adminData[0].name}
                            />
                    </td>
                </tr>
                <tr>
                    <td> 
                        <label> 
                        เบอร์โทร:
                        </label> 
                    </td> 
                    <td>
                        
                        <Input
                            type="text"
                            placeholder="tel"
                            className="col-span-3 "
                            maxLength={10}
                            id="admin_tel"
                            value={adminData ? adminData[0].tel:''}
                            />
                        
                    </td>
                </tr>
                <tr>
                    <td> 
                        <label> 
                        อีเมล:
                        </label> 
                    </td> 
                    <td>
                         
                         <Input
                            type="text"
                            placeholder="email"
                            className="col-span-3 "
                            maxLength={25}
                            id="admin_email"
                            value={adminData ? adminData[0].email:''}
                            />
                    </td>
                </tr>
                <tr>
                    <td> 
                        <label> 
                        Role:
                        </label> 
                    </td> 
                    <td>
                        <select name="Role" id="role"> 
                        <option value="Admin">Admin</option> 
                        <option value="Moderator">Moderator</option>  
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
        <div className="flex justify-center mt-4 ">
            <button  type="submit" className="rounded-md bg-sky-600 hover:bg-green-600 px-3 py-2
                shadow-sm text-white"> Save
                </button>
        </div>
        
     </form>
        </div>
    )
}