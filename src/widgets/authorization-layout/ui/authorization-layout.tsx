import { ScrollArea } from '@mantine/core'
import style from './style.module.css'

interface AuthorizationLayoutProps {
  children: React.ReactNode
}

const SCROLL_WIDTH = 6

export const AuthorizationLayout: React.FC<AuthorizationLayoutProps> = ({ children }) => {
  return (
    <div className={style.container_layout}>
      <ScrollArea type="hover" className={style.scroll_area} scrollbarSize={SCROLL_WIDTH}>
        {children}
      </ScrollArea>
    </div>
  )
}
