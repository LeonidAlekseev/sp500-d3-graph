import React, { useState } from "react";

const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="border-t">
      <div
        className="flex justify-between items-center py-2 cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="text-md font-bold">{title}</h2>
      </div>
      {isOpen && <div className="pb-2">{content}</div>}
    </div>
  );
};

const Accordion = ({ className, items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`${className} border-b`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
