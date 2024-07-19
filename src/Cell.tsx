import React from "react";

type CellProps = {
  value: string;
  onClick: () => void;
};

function Cell({ value, onClick }: CellProps) {
  return (
    <td className={value} onClick={onClick} role="cell">
      {value}
    </td>
  );
}

export default Cell;