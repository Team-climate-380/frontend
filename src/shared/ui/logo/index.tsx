export interface ILogoProps {
  size?: number
  alt: string
  variant: 'dark' | 'light'
  className?: string
}

export const Logo = ({ size, alt, variant = 'dark', className }: ILogoProps) => {
  const logoDark = '/logo/logo-black.svg'
  const logoLight = '/logo/logo-white.svg'
  return <img src={variant === 'dark' ? logoDark : logoLight} width={size} alt={alt} className={className} />
}
