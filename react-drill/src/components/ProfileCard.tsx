import type { Student } from "../types"
import Avatar from "./Avatar"
import Badge from "./Badge"
   function ProfileCard({ student }: { student: Student }) {
     return (
       <div className="rounded-2xl bg-slate-800 p-5">
         <div className="flex items-center gap-3">
           <Avatar name={student.name} />
           <div>
             <h3 className="font-bold">{student.name}</h3>
             <p className="text-sm text-slate-400">{student.role}</p>
           </div>
         </div>
         <div className="mt-3 flex flex-wrap gap-2">
           {student.skills.map((skill) => (
             <Badge key={skill} text={skill} />
           ))}
         </div>
       </div>
     )
   }

   export default ProfileCard
   