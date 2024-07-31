import {Noto_Sans, Fjalla_One} from 'next/font/google'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-notoSans',
})

const fjallaOne = Fjalla_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-fjallaOne',
})

export {notoSans, fjallaOne}
