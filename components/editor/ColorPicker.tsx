"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChromePicker } from "react-color";
import { colors } from "@/constants/colors";

const ColorPicker = ({
  label,
  currentColor,
  handleColorChange,
}: ColorPickerProps) => {
  return (
    <div className={`flex flex-col`}>
      <Label htmlFor={"color"} className="text-xs">
        {label}
      </Label>

      <div className="dropdown-wrapper flex flex-wrap gap-1 p-1">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="gap-2">
              <div
                style={{ background: currentColor }}
                className="rounded-md h-full w-6 cursor-pointer active:scale-105"
              />
              <span>{currentColor}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="flex flex-col items-center justify-center w-[240px]"
            side="left"
            sideOffset={10}
          >
            <Tabs defaultValue="colorPicker">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="colorPicker">🎨</TabsTrigger>
                <TabsTrigger value="suggestions">⚡️</TabsTrigger>
              </TabsList>
              <TabsContent value="colorPicker">
                <ChromePicker
                  color={currentColor}
                  onChange={(color) => handleColorChange(color.hex)}
                />
              </TabsContent>
              <TabsContent value="suggestions">
                <div className="flex flex-wrap gap-1 mt-2">
                  {colors.map((color) => (
                    <div
                      key={color}
                      style={{ background: color }}
                      className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                      onClick={() => handleColorChange(color)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ColorPicker;
