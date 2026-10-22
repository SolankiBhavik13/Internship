   function Badge({ text }: { text: string }) {
     return (
       <span className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white">
         {text}
       </span>
     )
   }

   export default Badge
   