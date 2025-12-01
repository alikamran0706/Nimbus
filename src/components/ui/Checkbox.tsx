export const Checkbox = ({checked, onCheckedChange}: any) => {

  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onCheckedChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className="w-[18px] h-[18px] border-2 border-gray-300 rounded-sm peer-checked:bg-primary-600 
            peer-checked:border-primary-600 flex items-center justify-center peer-focus:ring-2 
            peer-focus:ring-red-300
        "
      >
        <svg
          className={`w-[18px] h-[18px] text-white transition-opacity ${
            checked ? 'opacity-100' : 'opacity-0'
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </label>
  )
}
