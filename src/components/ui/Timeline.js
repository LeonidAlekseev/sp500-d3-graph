import React from "react";

export default function Timeline({ title, data }) {
  return (
    <div className="relative w-screen overflow-x-clip">
      <div className="p-4 text-center">
        <span className="text-lg font-bold text-neutral-700">{title}</span>
      </div>
      <div className="w-screen overflow-x-scroll overscroll-x-none">
        <div className="w-fit">
          <div className="w-full h-[5px] bg-gradient-to-r from-neutral-300 to-neutral-600"></div>
          <div className="p-4 flex justify-between gap-4">
            {data.map((step, index) => (
              <div
                key={index}
                className="p-4 flex flex-col items-center rounded-lg border"
              >
                {step.element}
                <span className="mt-2 text-md text-neutral-700">
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
