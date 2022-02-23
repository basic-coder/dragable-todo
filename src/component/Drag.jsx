import React, {useState, useRef} from 'react'

const data =  ['React', 'Angular', 'Nodejs','MongoDB']


const Drag = () => {

  //constants 
  const [list, setList] = useState(data)
  const dragItem = useRef();
  const dragNode = useRef();
  const [dragging, setDragging] = useState(false)

  // initialize when dragging the list
  const handleDragStart = (e,params) => {
    console.log("drag",params);
    dragItem.current = params
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd)
    setTimeout(()=>{
      setDragging(true)
    },0)
    setDragging(true)
  }

  // change styles while dragging
  const getStyles = (params) =>{
    const currentItem = dragItem.current;
    if(currentItem.itemI === params.itemI){
      return 'current item'
    }
    return 'item'
  }

  // trigger when the drag item enter on other item
  const handleDragEnter = (e,params) => {
    const currentItem = dragItem.current
    if(e.target !== dragNode.current){
      //setting the list
      setList(
        oldList => {
          let newList = JSON.parse(JSON.stringify(oldList))
          newList.splice(params.itemI, 0,
            newList.splice(currentItem.itemI,1)[0])
          dragItem.current= params;
          //return new list
          return newList
        }
      )
    }
  }

  // when dragends
  const handleDragEnd = () =>{
    setDragging(false)
    dragNode.current.removeEventListener('dragend', handleDragEnd)
    dragItem.current = null;
    dragNode.current = null;
  }

return (
<div className="container" > 
  <div className="dnd-group">
    <div className="title">TODO</div>
       {list.map((item,itemI) => (
          <div draggable 
          onDragStart={(e) => handleDragStart(e, {itemI})}
          onDragEnter={(e) => handleDragEnter(e,{itemI})}
           key={item} className={dragging? getStyles({itemI}) : "item"}>
          <span className='text'>
            {item}
          </span>
        </div>
       ))}
  </div>
</div>
)
}

export default Drag