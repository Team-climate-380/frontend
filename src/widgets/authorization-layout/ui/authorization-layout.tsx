import { ScrollArea } from '@mantine/core'
import style from './style.module.css'

interface AuthorizationLayoutProps {
  children: React.ReactNode
}

const CONTAINER_HEIGHT = 431
const SCROLL_WIDTH = 6

export const AuthorizationLayout: React.FC<AuthorizationLayoutProps> = ({ children }: AuthorizationLayoutProps) => {
  return (
    <div className={style.container_layout}>
      <ScrollArea type="hover" h={CONTAINER_HEIGHT} scrollbarSize={SCROLL_WIDTH}>
        {children}
      </ScrollArea>
    </div>
  )
}
