import React, { useRef, useContext } from "react";
import { CardLine } from "./styles";
import { useDrag, useDrop } from "react-dnd";
import IngredientsContext from "../../contexts/cards";
import { Icon } from "@iconify/react";
import { Grid, Checkbox } from "@mui/material";

export default function Card({ data, index }) {
  const ref = useRef();
  const { move, addItemToDelete, removeItemToDelete } = useContext(
    IngredientsContext
  );
  const [checked, setChecked] = React.useState(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { index, id: data.id, data: data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) {
        return;
      }
      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedIndex, targetIndex);

      item.index = targetIndex;
    }
  });

  dragRef(dropRef(ref));

  const check = (event) => {
    setChecked(event.target.checked);

    if (event.target.checked) {
      addItemToDelete(data);
    } else {
      removeItemToDelete(data);
    }
  };

  return (
    <CardLine ref={ref} isDragging={isDragging}>
      <Grid container spacing={1} sx={{ alignItems: "center" }}>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Checkbox
            color="default"
            checked={checked[0]}
            onChange={check}
          />
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Icon
            icon="material-symbols:drag-handle-rounded"
            style={{
              fontSize: "24px",
              marginRight: "15px"
            }}
          />
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          {index + 1}
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          {data.id}
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "left" }}>
          {data.description}
        </Grid>
      </Grid>
    </CardLine>
  );
}