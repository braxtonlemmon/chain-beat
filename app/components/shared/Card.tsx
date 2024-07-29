import {CSSProperties} from 'react'

type TCard = {
  style?: CSSProperties
  children: React.ReactNode
}

function Card({style, children}: TCard) {
  return (
    <div
      className="rounded-lg shadow-md p-3 bg-white flex flex-col justify-center items-center m-3"
      style={{...style}}
    >
      {children}
    </div>
  )
}

export default Card
