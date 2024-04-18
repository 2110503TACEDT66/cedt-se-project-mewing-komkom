import { TextField } from "@mui/material";
import { Input } from "@/components/ui/input";
import addNewAdminForm from "@/components/moderator/addNewAdminForm";
export default function managePage() {
    return (
      <main>
       <div className="mt-4 mx-auto max-w-md">
        <div className="text-center text-2xl font-bold py-3">Add New Admin</div>
        <addNewAdminForm></addNewAdminForm>

       </div>
      </main>
    );
  }