import { CiForkAndKnife } from "react-icons/ci"

function FilterProduct({category, onClick, isActive}) {
  return (
    <div onClick={onClick} className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110 my-2">
        <div className={`text-3xl h-16 w-16 flex items-center justify-center text-white rounded-full cursor-pointer shadow-lg ${isActive ? "bg-slate-600 text-white" : "bg-slate-500"}`}>
            <CiForkAndKnife />
        </div>
        <p className="text-center font-medium my-1 capitalize text-slate-700">{category}</p>
    </div>
  )
}

export default FilterProduct