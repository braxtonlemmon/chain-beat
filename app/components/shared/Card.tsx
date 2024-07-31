import {CSSProperties} from 'react'

type TCard = {
  style?: CSSProperties
  children: React.ReactNode
}

function Card({style, children}: TCard) {
  return (
    <div
      className="rounded-lg shadow-md py-5 px-8 bg-white flex flex-col justify-center items-center bg-cardBackground gap-4 "
      style={{...style}}
    >
      {children}
    </div>
  )
}

export default Card
