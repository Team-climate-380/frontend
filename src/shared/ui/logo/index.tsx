export interface ILogoProps {
  size?: number
  alt: string
  variant: 'dark' | 'light'
}

export const Logo = ({ size, alt, variant = 'dark' }: ILogoProps) => {
  const logoDark = '/logo/logo-black.svg'
  const logoLight = '/logo/logo-white.svg'
  return <img src={variant === 'dark' ? logoDark : logoLight} width={size} alt={alt} />
}
