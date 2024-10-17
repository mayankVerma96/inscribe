import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";
import FontFamilyPicker from "./FontFamilyPicker";
import ColorPicker from "./ColorPicker";
import SliderField from "./SliderField";

const TextCustomizer: React.FC<TextCustomizerProps> = ({
  textSet,
  handlePropertyChange,
}) => {
  const handleTextChange = ({
    id,
    property,
    value,
  }: {
    id: number;
    property: string;
    value: string;
  }) => {
    handlePropertyChange({ id, property, value });
  };

  return (
    <AccordionItem value={`item-${textSet.id}`}>
      <AccordionTrigger>
        <p className=" text-xl font-mono font-bold">{textSet.text}</p>
      </AccordionTrigger>
      <AccordionContent className="pb-8 pt-2 px-1">
        <div>
          {/* <div className="flex flex-col gap-4 px-2"> */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs mb-1">Text</p>
              <Input
                value={textSet.text}
                onChange={(e) =>
                  handleTextChange({
                    id: textSet.id,
                    property: "text",
                    value: e.target.value,
                  })
                }
                // className="w-[50%]"
              />
            </div>

            <div>
              <FontFamilyPicker
                currentFont={textSet.fontFamily}
                handleFontChange={(selectedFont) =>
                  handlePropertyChange({
                    id: textSet.id,
                    property: "fontFamily",
                    value: selectedFont,
                  })
                }
              />
            </div>

            <div>
              <ColorPicker
                currentColor={textSet.color}
                handleColorChange={(colorHex) =>
                  handlePropertyChange({
                    id: textSet.id,
                    property: "color",
                    value: colorHex,
                  })
                }
                label="Text Color"
              />
            </div>

            <div>
              <ColorPicker
                currentColor={textSet.shadowColor}
                handleColorChange={(colorHex) =>
                  handlePropertyChange({
                    id: textSet.id,
                    property: "shadowColor",
                    value: colorHex,
                  })
                }
                label="Shadow Color"
              />
            </div>
          </div>

          <SliderField
            label="X Position"
            min={-200}
            max={200}
            step={1}
            currentValue={textSet.left}
            handlePropertyChange={(value) =>
              handlePropertyChange({ id: textSet.id, property: "left", value })
            }
          />
          <SliderField
            label="Y Position"
            min={-100}
            max={100}
            step={1}
            currentValue={textSet.top}
            handlePropertyChange={(value) =>
              handlePropertyChange({ id: textSet.id, property: "top", value })
            }
          />
          <SliderField
            label="Text Size"
            min={10}
            max={800}
            step={1}
            currentValue={textSet.fontSize}
            handlePropertyChange={(value) =>
              handlePropertyChange({
                id: textSet.id,
                property: "fontSize",
                value,
              })
            }
          />
          <SliderField
            label="Font Weight"
            min={100}
            max={900}
            step={100}
            currentValue={textSet.fontWeight}
            handlePropertyChange={(value) =>
              handlePropertyChange({
                id: textSet.id,
                property: "fontWeight",
                value,
              })
            }
          />
          <SliderField
            label="Text Opacity"
            min={0}
            max={1}
            step={0.01}
            currentValue={textSet.opacity}
            handlePropertyChange={(value) =>
              handlePropertyChange({
                id: textSet.id,
                property: "opacity",
                value,
              })
            }
          />
          <SliderField
            label="Rotation"
            min={-360}
            max={360}
            step={1}
            currentValue={textSet.rotation}
            handlePropertyChange={(value) =>
              handlePropertyChange({
                id: textSet.id,
                property: "rotation",
                value,
              })
            }
          />

          <SliderField
            label="Shadow Size"
            min={0}
            max={10}
            step={1}
            currentValue={textSet.shadowSize}
            handlePropertyChange={(value) =>
              handlePropertyChange({
                id: textSet.id,
                property: "shadowSize",
                value,
              })
            }
          />

          <SliderField
            label="Shadow Blur"
            min={0}
            max={10}
            step={1}
            currentValue={textSet.shadowBlur}
            handlePropertyChange={(value) =>
              handlePropertyChange({
                id: textSet.id,
                property: "shadowBlur",
                value,
              })
            }
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TextCustomizer;
