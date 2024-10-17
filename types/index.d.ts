declare type TextSet = {
  id: number;
  text: string;
  fontFamily: string;
  top: number;
  left: number;
  color: string;
  fontSize: number;
  fontWeight: number;
  opacity: number;
  rotation: number;
  shadowColor: string;
  shadowSize: number;
  shadowBlur: number;
};

declare type TextCustomizerProps = {
  textSet: TextSet;
  handlePropertyChange: ({ id: number, property: string, value: any }) => void;
};

declare type FontFamilyPickerProps = {
  currentFont: string;
  handleFontChange: (selectedFont: string) => void;
};

declare type ColorPickerProps = {
  label: string;
  currentColor: string;
  handleColorChange: (colorHex: string) => void;
};

declare type SliderFieldProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  currentValue: number;
  handlePropertyChange: (value: number) => void;
};
