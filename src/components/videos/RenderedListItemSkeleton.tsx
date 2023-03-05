import React,{FC} from 'react'
import ListItemSkeleton from './ListItemSkeleton'

interface Props {
    number: number
}



const RenderedListItemSkeleton:FC<Props> = ({number}) => (
  <>
  {
      new Array(number).fill(0).map((s, i) => (
          <ListItemSkeleton key={i} />
      ))
  }
</>
)
export default RenderedListItemSkeleton