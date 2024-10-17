import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fonts } from "@/constants/fonts";

const FontFamilyPicker = ({
  currentFont,
  handleFontChange,
}: FontFamilyPickerProps) => {
  return (
    <Select>
      <p className="text-xs mb-1">Font Family</p>

      <SelectTrigger className="w-full">
        <SelectValue placeholder={currentFont} />
      </SelectTrigger>
      <SelectContent>
        {fonts.map((font) => (
          <SelectItem
            key={`font-family-${font}`}
            value={font}
            onPointerDown={() => handleFontChange(font)}
            onMouseDown={() => handleFontChange(font)}
          >
            {font}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FontFamilyPicker;
