interface Props {
  items: string[];
  heading: string;

  onSelectItem: (item: string) => void;
}


import { useState } from "react";

function ListGroup({items, heading, onSelectItem}: Props) {
  
  // State Hook
  let [selectedIndex, setSelectedIndex] = useState(-1)

  return (
    <div>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items</p>}
      <ul className="list-group">
        {items.map((item, index) => 
          <li 
            className={ selectedIndex === index ? "list-group-item active" : "list-group-item" }
            key={item} 
            onClick={() => {
               setSelectedIndex(index);
               onSelectItem(item);
            }}>
            {item}
        </li>)}
      </ul>
    </div>
  );
}

export default ListGroup;
