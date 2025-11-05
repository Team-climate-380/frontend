import { LoginForm } from '@/features/login-form'
import { AuthorizationLayout } from '@/widgets/authorization-layout'
import style from './style.module.scss'
import { useNavigate } from 'react-router'
import { routes } from '@/shared/configs/routs'
import { Logo } from '@shared/ui/logo/index'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const HandleClickRestorePassword = () => {
    navigate(routes.password_recovery())
  }
  return (
    <>
      <div className={style.login_wrapper}>
        <AuthorizationLayout
          children={
            <>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  marginTop: '36px',
                  marginLeft: '63px'
                }}
              >
                <Logo variant="dark" alt="Логотип" />
              </div>
              <div className={style.login_form__wrapper}>
                <LoginForm onRestorePassword={HandleClickRestorePassword} />
              </div>
            </>
          }
        />
      </div>
    </>
  )
}

export default LoginPage
