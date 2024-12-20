import React from "react";

export default function WeekTime({ time }) {
  return (
    <>
      <div>
        <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
          {time}
        </div>
      </div>
      <div />
    </>
  );
}
