import { TextField } from "@mui/material";
import { Input } from "@/components/ui/input";
import EditAdminForm from "@/components/moderator/editAdminForm";
export default function managePage() {
    return (
      <main>
       <div className="mt-4 mx-auto max-w-md">
        <div className="text-center text-2xl font-bold py-3">Edit Admin</div>
        <EditAdminForm></EditAdminForm>

       </div>
      </main>
    );
  }