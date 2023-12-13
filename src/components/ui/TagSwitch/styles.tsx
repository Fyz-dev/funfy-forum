import { tv } from '@nextui-org/theme';

const checkboxStyles = tv({
  slots: {
    base: 'bg-default border-none hover:opacity-hover transition-all',
    content: 'text-default-foreground ',
  },
  variants: {
    isSelected: {
      true: {
        base: 'bg-danger-400 hover:opacity-hover ',
        content: 'pl-1 text-content1',
      },
    },
    isFocusVisible: {
      true: {
        base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
      },
    },
  },
});

export default checkboxStyles;
