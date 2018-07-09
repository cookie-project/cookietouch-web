import React from "react";

export function DofusMapCell({
  row,
  column,
  isObstacle
}: {
  row: number;
  column: number;
  isObstacle: boolean;
}) {
  const x = 22 * (row % 2) + column * 44;
  const y = row * 11;
  const fill = isObstacle ? "rgb(244,67,54)" : "rgb(207,216,220)";
  return (
    <path
      d="M 22 0 L 44 11 L 22 22 L 0 11 L 22 0"
      transform={`translate(${x} ${y})`}
      fill={fill}
      stroke="white"
    />
  );
}

export function DofusMapViewer({ data }: any) {
  const cells = data.cells;
  return (
    <div>
      <svg width="700" height="700" xmlns="http://www.w3.org/2000/svg">
        {range(0, 40).map(row =>
          range(0, 14).map(column => (
            <DofusMapCell
              key={`${row}-${column}`}
              row={row}
              column={column}
              // tslint:disable-next-line:no-bitwise
              isObstacle={(cells[row * 14 + column].l & 2) !== 2}
            />
          ))
        )}
      </svg>
    </div>
  );
}

function range(start: number, count: number): number[] {
  return Array.apply(0, Array(count)).map((element: number, index: number) => {
    return index + start;
  });
}
