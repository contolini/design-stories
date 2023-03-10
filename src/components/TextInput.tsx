import type React from 'react';

type TextInputReference =
  | React.RefObject<HTMLInputElement>
  | string
  | ((instance: HTMLInputElement | null) => void)
  | null
  | undefined;

interface RequiredTextInputProperties {
  id: string;
  name: string;
  type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
}

interface CustomTextInputProperties {
  className?: string;
  width?: 'default' | 'full';
  isDisabled?: boolean;
  inputRef?: TextInputReference;
  inputProps?: JSX.IntrinsicElements['input'];
}

export type OptionalTextInputProperties = CustomTextInputProperties &
  JSX.IntrinsicElements['input'];

export type TextInputProperties = OptionalTextInputProperties &
  RequiredTextInputProperties;

const baseStyles = [
  'text-black',
  'p-2',
  'leading-[normal]',
  'border',
  'border-gray-60'
];

const hoverStyles = [
  'hover:border-pacific',
  'hover:outline-1',
  'hover:outline-pacific',
  'hover:outline'
];

const focusStyles = [
  'focus:outline-1',
  'focus:outline-pacific',
  'focus:outline-dotted',
  'focus:box-shadow-glow'
];

const widthStyles = {
  default: [],
  full: ['w-full']
};

const disabledStyles = [
  'bg-gray-20',
  'text-gray',
  'cursor-not-allowed',
  'outline-0',
  'border-gray-60'
];

export function TextInput({
  id,
  name,
  type,
  className,
  width = 'default',
  isDisabled = false,
  inputRef,
  ...inputProperties
}: TextInputProperties): JSX.Element {
  let styles = [
    ...baseStyles,
    ...hoverStyles,
    ...focusStyles,
    ...widthStyles[width]
  ];
  if (isDisabled) {
    styles = [...disabledStyles, ...styles];
  }
  const classes = [className, ...styles].join(' ');

  return (
    <input
      data-testid='textInput'
      className={classes}
      disabled={isDisabled}
      id={id}
      name={name}
      type={type}
      ref={inputRef}
      {...inputProperties}
    />
  );
}

export default TextInput;
