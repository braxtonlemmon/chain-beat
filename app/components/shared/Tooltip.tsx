type TTooltip = {
  text: string
  children: React.ReactNode
  xOrientation: 'left-0' | 'right-0'
}

function Tooltip({text, children, xOrientation}: TTooltip) {
  return (
    <div className="relative group">
      {children}
      <span
        className={`hidden lg:block absolute z-10 rounded ${xOrientation} top-8 scale-0 bg-primaryText p-2 text-xs text-[black] group-hover:scale-100 transition-all`}
      >
        {text}
      </span>
    </div>
  )
}

export default Tooltip
