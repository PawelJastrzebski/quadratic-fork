import {
  BorderNoneIcon,
  CheckIcon,
  DotsHorizontalIcon,
  FontBoldIcon,
  FontItalicIcon,
  MagicWandIcon,
  MagnifyingGlassIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextIcon,
  TextNoneIcon,
} from '@radix-ui/react-icons';
import React from 'react';

export {
  BorderNoneIcon,
  CheckIcon,
  DotsHorizontalIcon,
  FontBoldIcon,
  FontItalicIcon,
  MagicWandIcon,
  MagnifyingGlassIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextIcon,
  TextNoneIcon,
};

// Our extension of the Radix icons
// https://www.radix-ui.com/icons

// Built follow examples from radix icons:
// https://github.com/radix-ui/icons/blob/master/packages/radix-icons/src/AccessibilityIcon.tsx

// Icons designed originally on 15x15px artboard. Figma file:
// https://www.figma.com/file/xld8IGtKZvuQdf7MfOgGKI/Radix-Icons?type=design&node-id=0%3A1&mode=design&t=cDhBGQQ9cedOlFIP-1

// Contents are manually copy/pasted from Figma as .svg files

export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

export const BorderAll2Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 0.25C0.585786 0.25 0.25 0.585786 0.25 1V14C0.25 14.4142 0.585786 14.75 1 14.75H14C14.4142 14.75 14.75 14.4142 14.75 14V1C14.75 0.585786 14.4142 0.25 14 0.25H1ZM1.75 6.75V1.75H6.75V6.75L1.75 6.75ZM1.75 8.25V13.25H6.75V8.25L1.75 8.25ZM8.25 13.25H13.25V8.25L8.25 8.25V13.25ZM13.25 6.75V1.75H8.25V6.75L13.25 6.75Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const BorderVerticalIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <rect x="13" y="5.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="3.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="7.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="5" y="7.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="5" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="5" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="3" y="7.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="3" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="3" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="9" y="7.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="9" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="9" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="11" y="7.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="11" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="11" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="9.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="11.025" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="5.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="3.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="7.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="9.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="11.025" width="1" height="1" rx="0.5" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M6.75 14L6.75 1L8.25 1L8.25 14L6.75 14Z" fill={color} />
      </svg>
    );
  }
);

export const BorderInnerIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <rect x="13" y="5.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="3.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="5" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="5" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="3" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="3" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="9" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="9" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="11" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="11" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="9.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="11.025" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="5.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="3.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="9.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="11.025" width="1" height="1" rx="0.5" fill={color} />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.75 8.25V14H8.25V8.25L14 8.25V6.75L8.25 6.75V1H6.75V6.75L1 6.75V8.25L6.75 8.25Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const BorderHorizontalIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <rect x="7" y="5.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="5.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="7" y="3.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="3.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="7" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="7" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="5" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="5" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="3" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="3" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="9" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="9" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="11" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="11" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="7" y="9.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="9.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="7" y="11.025" width="1" height="1" rx="0.5" fill={color} />
        <rect x="13" y="11.025" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="5.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="3.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="13.0254" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="1.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="9.02502" width="1" height="1" rx="0.5" fill={color} />
        <rect x="1" y="11.025" width="1" height="1" rx="0.5" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M14 8.25L1 8.25L1 6.75L14 6.75L14 8.25Z" fill={color} />
      </svg>
    );
  }
);

export const FileDeleteIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 2.5C3 2.22386 3.22386 2 3.5 2H8V5.5C8 5.77614 8.22386 6 8.5 6H12V7H13V5.5C13 5.36739 12.9473 5.24021 12.8536 5.14645L8.85355 1.14645C8.75979 1.05268 8.63261 1 8.5 1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H7V13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM11.2929 5L9 2.70711V5H11.2929Z"
          fill={color}
        />
        <path d="M9.25 11.5H13.75" stroke={color} strokeLinecap="round" />
      </svg>
    );
  }
);

export const FileDownloadIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 2.5C3 2.22386 3.22386 2 3.5 2H8V5.5C8 5.77614 8.22386 6 8.5 6H12V7H13V5.5C13 5.36739 12.9473 5.24021 12.8536 5.14645L8.85355 1.14645C8.75979 1.05268 8.63261 1 8.5 1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H7V13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM11.2929 5L9 2.70711V5H11.2929Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.5 9C11.7761 9 12 9.22386 12 9.5V13.2929L13.1464 12.1464C13.3417 11.9512 13.6583 11.9512 13.8536 12.1464C14.0488 12.3417 14.0488 12.6583 13.8536 12.8536L11.8536 14.8536C11.7598 14.9473 11.6326 15 11.5 15C11.3674 15 11.2402 14.9473 11.1464 14.8536L9.14645 12.8536C8.95118 12.6583 8.95118 12.3417 9.14645 12.1464C9.34171 11.9512 9.65829 11.9512 9.85355 12.1464L11 13.2929V9.5C11 9.22386 11.2239 9 11.5 9Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const FileDuplicateIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 2.5C3 2.22386 3.22386 2 3.5 2H8V5.5C8 5.77614 8.22386 6 8.5 6H12V7H13V5.5C13 5.36739 12.9473 5.24021 12.8536 5.14645L8.85355 1.14645C8.75979 1.05268 8.63261 1 8.5 1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H7V13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM11.2929 5L9 2.70711V5H11.2929Z"
          fill={color}
        />
        <path d="M9.25 11.5H13.75" stroke={color} strokeLinecap="round" />
        <path d="M11.5 13.75V9.25" stroke={color} strokeLinecap="round" />
      </svg>
    );
  }
);

export const SheetIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 4H1.5C1.22386 4 1 4.22386 1 4.5V6H4V4ZM5 4V6H14V4.5C14 4.22386 13.7761 4 13.5 4H5ZM4 7H1V10.5C1 10.7761 1.22386 11 1.5 11H4V7ZM5 11V7H14V10.5C14 10.7761 13.7761 11 13.5 11H5ZM1.5 3C0.671573 3 0 3.67157 0 4.5V10.5C0 11.3284 0.671573 12 1.5 12H13.5C14.3284 12 15 11.3284 15 10.5V4.5C15 3.67157 14.3284 3 13.5 3H1.5Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const SheetDeleteIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 4H13.5C13.7761 4 14 4.22386 14 4.5V8H15V4.5C15 3.67157 14.3284 3 13.5 3H1.5C0.671573 3 0 3.67157 0 4.5V10.5C0 11.3284 0.671573 12 1.5 12H6V11H1.5C1.22386 11 1 10.7761 1 10.5V4.5C1 4.22386 1.22386 4 1.5 4Z"
          fill={color}
        />
        <path d="M0.5 6.5H14.5" stroke={color} />
        <path d="M4.5 11.5V3.5" stroke={color} />
        <path d="M9.25 11.5H13.75" stroke={color} strokeLinecap="round" />
      </svg>
    );
  }
);

export const SheetDuplicateIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 4H13.5C13.7761 4 14 4.22386 14 4.5V7H15V4.5C15 3.67157 14.3284 3 13.5 3H1.5C0.671573 3 0 3.67157 0 4.5V10.5C0 11.3284 0.671573 12 1.5 12H6V11H1.5C1.22386 11 1 10.7761 1 10.5V4.5C1 4.22386 1.22386 4 1.5 4Z"
          fill={color}
        />
        <path d="M0.5 6.5H14.5" stroke={color} />
        <path d="M4.5 11.5V3.5" stroke={color} />
        <path d="M9.25 11.5H13.75" stroke={color} strokeLinecap="round" />
        <path d="M11.5 13.75V9.25" stroke={color} strokeLinecap="round" />
      </svg>
    );
  }
);

export const SheetSwitchIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 4H13.5C13.7761 4 14 4.22386 14 4.5V8H15V4.5C15 3.67157 14.3284 3 13.5 3H1.5C0.671573 3 0 3.67157 0 4.5V10.5C0 11.3284 0.671573 12 1.5 12H6V11H1.5C1.22386 11 1 10.7761 1 10.5V4.5C1 4.22386 1.22386 4 1.5 4Z"
          fill={color}
        />
        <path d="M0.5 6.5H14.5" stroke={color} />
        <path d="M4.5 11.5V3.5" stroke={color} />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.5 11.5C8.5 11.2239 8.72386 11 9 11L12.7929 11L11.6464 9.85355C11.4512 9.65829 11.4512 9.34171 11.6464 9.14645C11.8417 8.95118 12.1583 8.95118 12.3536 9.14645L14.3536 11.1464C14.4473 11.2402 14.5 11.3674 14.5 11.5C14.5 11.6326 14.4473 11.7598 14.3536 11.8536L12.3536 13.8536C12.1583 14.0488 11.8417 14.0488 11.6464 13.8536C11.4512 13.6583 11.4512 13.3417 11.6464 13.1464L12.7929 12L9 12C8.72386 12 8.5 11.7761 8.5 11.5Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const CommandPaletteIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path d="M3 3.5L8 8L3 12.5" strokeWidth="1.1" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 11.5H14" strokeWidth="1.1" stroke={color} strokeLinecap="round" />
      </svg>
    );
  }
);

export const DatabaseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M7.5 3C5.17625 3 2 3.69333 2 5.5V10.6556C2 12.4622 5.41495 13 7.5044 13C9.58505 13 13 12.4617 13 10.655V5.5C13 3.69278 9.71485 3 7.5 3ZM7.5 4C9.50145 4 12 4.71889 12 5.5C12 6.35 9.0884 7 7.5 7C5.6234 7 3 6.28278 3 5.5C3 4.64833 5.74275 4 7.5 4ZM12 10.5C12 11.4411 9.0928 12 7.5044 12C5.6278 12 3 11.3667 3 10.5V9.5C4.16435 10.2211 5.9435 10.5 7.5044 10.5C9.06035 10.5 10.8362 10.2211 12 9.5V10.5ZM7.5 9.5C5.6157 9.5 3 8.86444 3 8V7C4.16435 7.72111 5.9391 8 7.5 8C9.05595 8 10.8362 7.72111 12 7V8C12 8.94278 9.07355 9.5 7.5 9.5Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const TextFormatIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.94993 2.95005L1.94993 4.50001C1.94993 4.74854 1.74845 4.95001 1.49993 4.95001C1.2514 4.95001 1.04993 4.74854 1.04993 4.50001V2.50007C1.04993 2.45249 1.05731 2.40665 1.07099 2.3636C1.12878 2.18178 1.29897 2.05005 1.49993 2.05005H9.49993C9.65526 2.05005 9.79221 2.12875 9.87308 2.24845C9.9216 2.32027 9.94993 2.40685 9.94993 2.50005L9.94994 2.50007V4.50001C9.94994 4.74854 9.74847 4.95001 9.49994 4.95001C9.25141 4.95001 9.04994 4.74854 9.04994 4.50001V2.95005H6.04993V12.0501H7.25428C7.50281 12.0501 7.70428 12.2515 7.70428 12.5001C7.70428 12.7486 7.50281 12.9501 7.25428 12.9501H3.75428C3.50575 12.9501 3.30428 12.7486 3.30428 12.5001C3.30428 12.2515 3.50575 12.0501 3.75428 12.0501H4.94993V2.95005H1.94993Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.38706 10.0803C8.49764 8.7374 9.36862 7.49543 11 6C12.75 7.60417 13.625 8.91667 13.625 10.375C13.625 11.8247 12.4497 13 11 13C9.55025 13 8.375 11.8247 8.375 10.375C8.375 10.3178 8.37635 10.2608 8.37904 10.204C8.37636 10.1572 8.375 10.11 8.375 10.0625C8.37901 10.0685 8.38303 10.0745 8.38706 10.0803ZM12.5163 9.63396C11.8707 9.47907 11.1834 9.797 10.536 10.0964C10.1284 10.285 9.73659 10.4662 9.38115 10.5173C9.37708 10.4704 9.375 10.423 9.375 10.375C9.375 9.51151 9.80453 8.6132 11 7.3892C11.8602 8.26997 12.3239 8.98209 12.5163 9.63396Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const CellFormatIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 5H1L1 10H7V11H1C0.447715 11 0 10.5523 0 10V5C0 4.44772 0.447715 4 1 4H14C14.5523 4 15 4.44772 15 5H14H7ZM12 6C10.3686 7.49543 9.49764 8.7374 9.38706 10.0803L9.375 10.0625C9.375 10.11 9.37636 10.1572 9.37904 10.204C9.37635 10.2608 9.375 10.3178 9.375 10.375C9.375 11.8247 10.5503 13 12 13C13.4497 13 14.625 11.8247 14.625 10.375C14.625 8.91667 13.75 7.60417 12 6ZM11.536 10.0964C12.1834 9.797 12.8707 9.47907 13.5163 9.63396C13.3239 8.98209 12.8602 8.26997 12 7.3892C10.8045 8.6132 10.375 9.51151 10.375 10.375C10.375 10.423 10.3771 10.4704 10.3811 10.5173C10.7366 10.4662 11.1284 10.285 11.536 10.0964Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const TextColorIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.84088 3.07664C7.76832 2.88034 7.58118 2.75 7.3719 2.75C7.16261 2.75 6.97547 2.88034 6.90291 3.07664L3.82754 11.3962C3.73179 11.6552 3.86415 11.9428 4.12316 12.0386C4.38217 12.1343 4.66976 12.002 4.76551 11.7429L5.77352 9.01603H8.97027L9.97828 11.7429C10.074 12.002 10.3616 12.1343 10.6206 12.0386C10.8796 11.9428 11.012 11.6552 10.9163 11.3962L7.84088 3.07664ZM8.65606 8.16603L7.3719 4.69207L6.08773 8.16603H8.65606Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.75134 13.5001C2.75134 13.0859 3.08713 12.7501 3.50134 12.7501H11.4987C11.9129 12.7501 12.2487 13.0859 12.2487 13.5001C12.2487 13.9143 11.9129 14.2501 11.4987 14.2501H3.50134C3.08713 14.2501 2.75134 13.9143 2.75134 13.5001Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const PaintBucketIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.75134 13.5001C2.75134 13.0859 3.08713 12.7501 3.50134 12.7501H11.4987C11.9129 12.7501 12.2487 13.0859 12.2487 13.5001C12.2487 13.9143 11.9129 14.2501 11.4987 14.2501H3.50134C3.08713 14.2501 2.75134 13.9143 2.75134 13.5001Z"
          fill={color}
        />
        <path
          d="M10.3342 11.7013C10.5241 11.9004 10.7542 12 11.0247 12C11.2952 12 11.5254 11.9004 11.7152 11.7013C11.9051 11.5021 12 11.2606 12 10.9769C12 10.7752 11.9494 10.5749 11.8481 10.376C11.7468 10.177 11.641 9.98666 11.5304 9.80486C11.4526 9.68217 11.371 9.56623 11.2856 9.45706C11.2003 9.34789 11.1133 9.23195 11.0247 9.10925C10.9362 9.23195 10.8509 9.34789 10.769 9.45706C10.6871 9.56623 10.6072 9.68217 10.5293 9.80486C10.4188 9.98666 10.3112 10.177 10.2065 10.376C10.1018 10.5749 10.0494 10.7752 10.0494 10.9769C10.0494 11.2606 10.1444 11.5021 10.3342 11.7013Z"
          fill={color}
        />
        <path
          d="M3.22672 1.46627L3.6862 1L9.65235 6.49854C9.88412 6.71719 10 6.97513 10 7.27237C10 7.56962 9.88412 7.82537 9.65235 8.03963L6.81709 10.6872C6.59293 10.8944 6.32127 10.9987 6.00213 11C5.68299 11.0013 5.41229 10.897 5.19002 10.6872L2.35477 8.03963C2.11826 7.82537 2 7.56962 2 7.27237C2 6.97513 2.11826 6.71719 2.35477 6.49854L5.5291 3.59482L3.22672 1.46627ZM6.0235 4.03279L2.78432 7.00104C2.73683 7.04494 2.70787 7.09104 2.69742 7.13934C2.68697 7.18764 2.67795 7.23813 2.67034 7.29081H9.32751C9.32751 7.23813 9.3192 7.18764 9.30256 7.13934C9.28594 7.09104 9.25626 7.04494 9.21353 7.00104L6.0235 4.03279Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const DecimalIncreaseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M0.739442 9C0.331059 9 0 8.66894 0 8.26056V8.19657C0 7.78819 0.331059 7.45713 0.739442 7.45713V7.45713C1.14782 7.45713 1.47888 7.78819 1.47888 8.19657V8.26056C1.47888 8.66894 1.14782 9 0.739442 9V9ZM5.29387 9C4.60677 9 4.02216 8.74764 3.54007 8.24291C3.05795 7.73817 2.8169 7.1288 2.8169 6.4148V2.59439C2.8169 1.87784 3.05915 1.26631 3.54366 0.759784C4.02815 0.253261 4.6131 0 5.2985 0C5.98389 0 6.5691 0.253261 7.05413 0.759784C7.53917 1.26631 7.7817 1.87784 7.7817 2.59439V6.4148C7.7817 7.1288 7.53884 7.73817 7.05313 8.24291C6.5674 8.74764 5.98098 9 5.29387 9ZM11.5122 9C10.8251 9 10.2405 8.74764 9.75835 8.24291C9.27625 7.73817 9.0352 7.1288 9.0352 6.4148V2.59439C9.0352 1.87784 9.27745 1.26631 9.76196 0.759784C10.2465 0.253261 10.8314 0 11.5168 0C12.2022 0 12.7874 0.253261 13.2724 0.759784C13.7575 1.26631 14 1.87784 14 2.59439V6.4148C14 7.1288 13.7571 7.73817 13.2714 8.24291C12.7857 8.74764 12.1993 9 11.5122 9ZM5.29577 8.11837C5.74961 8.11837 6.13654 7.95275 6.45657 7.6215C6.77659 7.29024 6.93661 6.88801 6.93661 6.4148V2.59439C6.93661 2.11862 6.77717 1.71423 6.45828 1.3812C6.13939 1.04815 5.75216 0.881632 5.2966 0.881632C4.84105 0.881632 4.45473 1.04815 4.13763 1.3812C3.82053 1.71423 3.66199 2.11862 3.66199 2.59439V6.4148C3.66199 6.88801 3.82082 7.29024 4.1385 7.6215C4.45619 7.95275 4.84195 8.11837 5.29577 8.11837ZM11.5141 8.11837C11.9679 8.11837 12.3548 7.95275 12.6749 7.6215C12.9949 7.29024 13.1549 6.88801 13.1549 6.4148V2.59439C13.1549 2.11862 12.9955 1.71423 12.6766 1.3812C12.3577 1.04815 11.9705 0.881632 11.5149 0.881632C11.0594 0.881632 10.673 1.04815 10.3559 1.3812C10.0388 1.71423 9.88029 2.11862 9.88029 2.59439V6.4148C9.88029 6.88801 10.0391 7.29024 10.3568 7.6215C10.6745 7.95275 11.0603 8.11837 11.5141 8.11837Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.50005 12.05C8.25152 12.05 8.05005 12.2515 8.05005 12.5C8.05005 12.7485 8.25152 12.95 8.50005 12.95L13.4137 12.95L12.1819 14.1818C12.0061 14.3575 12.0061 14.6425 12.1819 14.8182C12.3576 14.9939 12.6425 14.9939 12.8182 14.8182L14.8182 12.8182C14.994 12.6425 14.994 12.3575 14.8182 12.1818L12.8182 10.1818C12.6425 10.0061 12.3576 10.0061 12.1819 10.1818C12.0061 10.3575 12.0061 10.6425 12.1819 10.8182L13.4137 12.05L8.50005 12.05Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const DecimalDecreaseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M0.739442 9C0.331059 9 0 8.66894 0 8.26056V8.19657C0 7.78819 0.331059 7.45713 0.739442 7.45713V7.45713C1.14782 7.45713 1.47888 7.78819 1.47888 8.19657V8.26056C1.47888 8.66894 1.14782 9 0.739442 9V9ZM5.29387 9C4.60677 9 4.02216 8.74764 3.54007 8.24291C3.05795 7.73817 2.8169 7.1288 2.8169 6.4148V2.59439C2.8169 1.87784 3.05915 1.26631 3.54366 0.759784C4.02815 0.253261 4.6131 0 5.2985 0C5.98389 0 6.5691 0.253261 7.05413 0.759784C7.53917 1.26631 7.7817 1.87784 7.7817 2.59439V6.4148C7.7817 7.1288 7.53884 7.73817 7.05313 8.24291C6.5674 8.74764 5.98098 9 5.29387 9ZM5.29577 8.11837C5.74961 8.11837 6.13654 7.95275 6.45657 7.6215C6.77659 7.29024 6.93661 6.88801 6.93661 6.4148V2.59439C6.93661 2.11862 6.77717 1.71423 6.45828 1.3812C6.13939 1.04815 5.75216 0.881632 5.2966 0.881632C4.84105 0.881632 4.45473 1.04815 4.13763 1.3812C3.82053 1.71423 3.66199 2.11862 3.66199 2.59439V6.4148C3.66199 6.88801 3.82082 7.29024 4.1385 7.6215C4.45619 7.95275 4.84195 8.11837 5.29577 8.11837Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5001 12.95C14.7486 12.95 14.9501 12.7485 14.9501 12.5C14.9501 12.2515 14.7486 12.05 14.5001 12.05L9.58647 12.05L10.8183 10.8182C10.994 10.6424 10.994 10.3575 10.8183 10.1818C10.6425 10.0061 10.3576 10.0061 10.1819 10.1818L8.18187 12.1818C8.00614 12.3575 8.00614 12.6424 8.18187 12.8182L10.1819 14.8182C10.3576 14.9939 10.6425 14.9939 10.8183 14.8182C10.994 14.6425 10.994 14.3575 10.8183 14.1818L9.58647 12.95L14.5001 12.95Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const DollarIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M7 2.5V0H8V2.5H7ZM9.70319 4.6C9.64653 4.125 9.41677 3.75625 9.0139 3.49375C8.61102 3.23125 8.11687 3.1 7.53144 3.1C7.10339 3.1 6.72884 3.16875 6.4078 3.30625C6.08991 3.44375 5.84126 3.63281 5.66186 3.87344C5.4856 4.11406 5.39747 4.3875 5.39747 4.69375C5.39747 4.95 5.45885 5.17031 5.5816 5.35469C5.70749 5.53594 5.86801 5.6875 6.06316 5.80937C6.2583 5.92812 6.46288 6.02656 6.67691 6.10469C6.89094 6.17969 7.08765 6.24063 7.26706 6.2875L8.24906 6.55C8.50086 6.61563 8.78098 6.70625 9.08943 6.82188C9.40103 6.9375 9.69847 7.09531 9.98174 7.29531C10.2682 7.49219 10.5042 7.74531 10.6899 8.05469C10.8756 8.36406 11 8.74375 11 9.19375C11 9.7125 10.8316 10.1813 10.5577 10.6C10.287 11.0188 9.89046 11.3828 9.36798 11.6297C8.84865 11.8766 8.21759 12 7.47479 12C6.78235 12 6.18276 11.8891 5.67602 11.6672C5.17243 11.4453 4.77585 11.1047 4.48628 10.7078C4.19986 10.3109 4.03777 9.775 4 9.25H5.20862C5.2401 9.6125 5.36285 9.9875 5.57687 10.225C5.79405 10.4594 6.06788 10.6344 6.39836 10.75C6.73199 10.8625 7.0908 10.9187 7.47479 10.9187C7.92173 10.9187 8.32303 10.8469 8.67869 10.7031C9.03435 10.5563 9.31605 10.3531 9.52378 10.0938C9.73152 9.83125 9.86692 9.525 9.86692 9.175C9.86692 8.85625 9.74568 8.59688 9.56627 8.39688C9.38687 8.19688 9.15081 8.03437 8.8581 7.90937C8.56538 7.78437 8.24906 7.675 7.90914 7.58125L6.7194 7.24375C5.96401 7.02813 5.366 6.72031 4.92535 6.32031C4.48471 5.92031 4.26439 5.39688 4.26439 4.75C4.26439 4.2125 4.41074 3.74375 4.70346 3.34375C4.99932 2.94063 5.3959 2.62813 5.89319 2.40625C6.39364 2.18125 6.95231 2.06875 7.56921 2.06875C8.19241 2.06875 8.74636 2.17969 9.23107 2.40156C9.71578 2.62031 10.0998 2.92031 10.383 3.30156C10.6695 3.68281 10.8205 4.11562 10.8363 4.6H9.70319Z"
          fill={color}
        />
        <path d="M7 14V11.5H8V14H7Z" fill={color} />
      </svg>
    );
  }
);

export const PercentIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M8.05507 10.0418V9.52852C8.05507 9.17364 8.13106 8.84886 8.28304 8.55418C8.43833 8.25634 8.663 8.0187 8.95705 7.84126C9.25441 7.66065 9.61454 7.57034 10.0374 7.57034C10.467 7.57034 10.8271 7.66065 11.1178 7.84126C11.4086 8.0187 11.6283 8.25634 11.777 8.55418C11.9257 8.84886 12 9.17364 12 9.52852V10.0418C12 10.3967 11.924 10.7231 11.772 11.0209C11.6233 11.3156 11.402 11.5532 11.1079 11.7338C10.8172 11.9113 10.4604 12 10.0374 12C9.60793 12 9.24615 11.9113 8.95209 11.7338C8.65804 11.5532 8.43502 11.3156 8.28304 11.0209C8.13106 10.7231 8.05507 10.3967 8.05507 10.0418ZM9.06608 9.52852V10.0418C9.06608 10.3365 9.13877 10.6011 9.28414 10.8356C9.42952 11.0669 9.68062 11.1825 10.0374 11.1825C10.3844 11.1825 10.6289 11.0669 10.7709 10.8356C10.9163 10.6011 10.989 10.3365 10.989 10.0418V9.52852C10.989 9.23384 10.9196 8.97085 10.7808 8.73954C10.6421 8.50507 10.3943 8.38783 10.0374 8.38783C9.69053 8.38783 9.44108 8.50507 9.2891 8.73954C9.14042 8.97085 9.06608 9.23384 9.06608 9.52852ZM3 4.47148V3.95817C3 3.6033 3.07599 3.27852 3.22797 2.98384C3.38326 2.686 3.60793 2.44835 3.90198 2.27091C4.19934 2.0903 4.55947 2 4.98238 2C5.41189 2 5.77203 2.0903 6.06278 2.27091C6.35352 2.44835 6.57324 2.686 6.72192 2.98384C6.87059 3.27852 6.94493 3.6033 6.94493 3.95817V4.47148C6.94493 4.82636 6.86894 5.15273 6.71696 5.45057C6.56828 5.74525 6.34692 5.98289 6.05286 6.1635C5.76211 6.34094 5.40529 6.42966 4.98238 6.42966C4.55286 6.42966 4.19108 6.34094 3.89703 6.1635C3.60297 5.98289 3.37996 5.74525 3.22797 5.45057C3.07599 5.15273 3 4.82636 3 4.47148ZM4.01101 3.95817V4.47148C4.01101 4.76616 4.0837 5.03074 4.22907 5.26521C4.37445 5.49652 4.62555 5.61217 4.98238 5.61217C5.3293 5.61217 5.57379 5.49652 5.71586 5.26521C5.86123 5.03074 5.93392 4.76616 5.93392 4.47148V3.95817C5.93392 3.6635 5.86454 3.40051 5.72577 3.1692C5.587 2.93473 5.33921 2.81749 4.98238 2.81749C4.63546 2.81749 4.38601 2.93473 4.23403 3.1692C4.08535 3.40051 4.01101 3.6635 4.01101 3.95817ZM3.5 12L10.5 2H11.5L4.5 12H3.5Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const FunctionIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path d="M3 13V11.9769L8.5 7.5L3 3V2H12V3H4.5L10 7.5L4.5 12H12V13H3Z" fill={color} />
      </svg>
    );
  }
);

export const CommaIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M5 13V12.1867C6.15213 11.7677 7.04139 11.1146 7.66779 10.2274C8.30537 9.35243 8.62416 8.42206 8.62416 7.43623C8.62416 7.20209 8.57383 7.00493 8.47315 6.84473C8.39485 6.73383 8.31655 6.67837 8.23826 6.67837C8.11521 6.67837 7.84676 6.8016 7.43289 7.04806C7.23154 7.15896 7.01902 7.21442 6.7953 7.21442C6.2472 7.21442 5.81096 7.03574 5.48658 6.67837C5.16219 6.32101 5 5.8281 5 5.19963C5 4.59581 5.20694 4.07825 5.62081 3.64695C6.04586 3.21565 6.5604 3 7.16443 3C7.90268 3 8.55705 3.35736 9.12752 4.07209C9.70917 4.77449 10 5.71103 10 6.8817C10 8.15096 9.59732 9.32779 8.79195 10.4122C7.99776 11.5089 6.73378 12.3715 5 13Z"
          fill={color}
        />
      </svg>
    );
  }
);

export const NumberFormatIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.9537 12.4999C13.9537 12.606 13.9115 12.7077 13.8365 12.7828L11.8365 14.7828C11.6803 14.939 11.4271 14.939 11.2708 14.7828C11.1146 14.6265 11.1146 14.3733 11.2708 14.2171L12.588 12.8999L1.51937 12.8999L2.83653 14.2171C2.99274 14.3733 2.99274 14.6265 2.83653 14.7828C2.68032 14.939 2.42705 14.939 2.27084 14.7828L0.270843 12.7828C0.195828 12.7077 0.153687 12.606 0.153687 12.4999C0.153687 12.3938 0.195828 12.2921 0.270844 12.2171L2.27084 10.2171C2.42705 10.0609 2.68032 10.0609 2.83653 10.2171C2.99274 10.3733 2.99274 10.6265 2.83653 10.7828L1.51937 12.0999L12.588 12.0999L11.2708 10.7828C11.1146 10.6265 11.1146 10.3733 11.2708 10.2171C11.4271 10.0609 11.6803 10.0609 11.8365 10.2171L13.8365 12.2171C13.9115 12.2921 13.9537 12.3938 13.9537 12.4999Z"
          fill={color}
        />
        <path
          d="M7.03465 3.31155L5.89908 3.79425C5.78948 3.86477 5.6712 3.89115 5.54423 3.8734C5.41726 3.85565 5.31979 3.78873 5.25183 3.67265C5.18269 3.57358 5.15662 3.46219 5.1736 3.33847C5.19059 3.21476 5.25293 3.11636 5.36063 3.04328L7.17793 2.06057C7.21255 2.04456 7.24395 2.03046 7.27215 2.01828C7.30037 2.00609 7.33631 2 7.37998 2H7.63075C7.72805 2 7.81393 2.03686 7.88838 2.11057C7.96283 2.18429 8.00005 2.26923 8.00005 2.3654V9.19425C8.00005 9.33093 7.95475 9.44555 7.86413 9.5381C7.7735 9.63067 7.6581 9.67695 7.51795 9.67695C7.37782 9.67695 7.26224 9.63157 7.1712 9.54082C7.08017 9.45009 7.03465 9.33457 7.03465 9.19425V3.31155Z"
          fill={color}
        />
      </svg>
    );
  }
);
