import React from "react";

export default function Timeline({ data }) {
  return (
    <div id="timeline" className="rounded-lg bg-white border w-full">
      <div className="p-4 text-center">
        <span className="text-neutral-700">Время</span>
      </div>
      <div className="w-full overflow-x-scroll">
        <div className="w-fit">
          <div className="w-[100%] h-[5px] bg-gradient-to-r from-neutral-300 to-neutral-600"></div>
          <div className="p-4 flex justify-between gap-4">
            {data.map((step, index) => (
              <div
                key={index}
                className="p-4 flex flex-col items-center rounded-lg border"
              >
                <div className="pointer-events-none">{step.element}</div>
                <span className="mt-2 text-xs text-neutral-700">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
