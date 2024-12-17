import React from "react";

export default function Timeline({ data }) {
  return (
    <>
      <div className="p-4 text-center">
        <span className="text-lg font-bold text-neutral-700">
          Изменения сети в дискретном времени
        </span>
      </div>
      <div className="w-screen overflow-x-scroll overscroll-x-none">
        <div className="w-fit">
          <div className="w-[100%] h-[5px] bg-gradient-to-r from-neutral-300 to-neutral-600"></div>
          <div className="p-4 flex justify-between gap-4">
            {data.map((step, index) => (
              <div
                key={index}
                className="p-4 flex flex-col items-center rounded-lg border"
              >
                <div className="overflow-clip">{step.element}</div>
                <span className="mt-2 text-md text-neutral-700">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
