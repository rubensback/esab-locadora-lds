import styled from 'styled-components'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as ScrollArea from '@radix-ui/react-scroll-area'

export const DropdownMenuContent = styled(DropdownMenu.Content)`
  margin-top: 2rem;
  background-color: ${(props) => props.theme['gray-700']};
  padding: 0.5rem;
  border-radius: 4px;
  max-height: calc(100vh - 37rem);
  overflow: auto;
`

export const DropdownMenuItem = styled(DropdownMenu.Item)`
  padding: 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
  }
`

export const DropdownMenuSeparator = styled(DropdownMenu.Separator)`
  height: 1px;
  background-color: ${(props) => props.theme['gray-800']};
  margin: 0.125rem 0;
`

export const ScrollAreaRoot = styled(ScrollArea.Root)`
  width: 200;
  height: 225;
  border-radius: 4;
  overflow: hidden;
  box-shadow: 0 2px 10px ${(props) => props.theme['gray-700']};
  background-color: 'white';
`

export const ScrollAreaViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`

export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  user-select: none;
  touch-action: none;
  padding: 2;
  background: ${(props) => props.theme['gray-500']};
  transition: background 160ms ease-out;

  /* &:hover { background: blackA.blackA8 };
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE };
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column';
    height: SCROLLBAR_SIZE;
  }; */
`

export const ScrollAreaThumb = styled(ScrollArea.Thumb)`
  /* flex: 1,
  background: mauve.mauve10,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  }, */
`
