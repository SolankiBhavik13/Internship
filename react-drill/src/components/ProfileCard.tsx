import type { Student } from "../types"
import Avatar from "./Avatar"

   function ProfileCard({ student }: { student: Student }) {
     return (
       <div className="rounded-2xl bg-slate-800 p-5">
         <div className="flex items-center gap-3">
           <Avatar name={student.name} />
           <div>
             <h3 className="font-bold">{student.name}</h3>
           </div>
         </div>
         <div className="mt-3 flex flex-wrap gap-2">
           
         </div>
       </div>
     )
   }

   export default ProfileCard
   