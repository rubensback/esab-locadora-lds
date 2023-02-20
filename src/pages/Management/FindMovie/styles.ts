import styled, { keyframes } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { rgba } from 'polished'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: ${(props) => rgba(props.theme['gray-900'], 0.7)};
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

export const DialogContent = styled(Dialog.Content)`
  background-color: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 1.75rem;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: 'none';
  }

  & [data-radix-popper-content-wrapper] {
    position: initial !important;
    transform: none !important;
  }
`

export const DialogTitle = styled(Dialog.Title)``

export const DialogDescription = styled(Dialog.Description)`
  margin-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme['gray-800']};
  padding-bottom: 0.5rem;
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`

export const DropdownMenuContent = styled(DropdownMenu.Content)`
  margin-top: 2rem;
`

export const DropdownMenuItem = styled(DropdownMenu.Item)``

export const DropdownMenuSeparator = styled(DropdownMenu.Separator)`
  height: 1px;
  background-color: ${(props) => props.theme['gray-800']};
  margin: 0.5rem 0;
`
