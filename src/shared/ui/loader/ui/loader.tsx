import { Loader, LoaderProps } from '@mantine/core'

export type LoaderOvalProps = Partial<LoaderProps>

export const LoaderOval: React.FC<LoaderOvalProps> = ({ color = 'var(--mantine-color-blue-6)', size = 'sm' }) => {
  return (
    <div
      style={
        size === 'xl'
          ? {
              position: 'absolute',
              top: 'calc(50vh - 29px)',
              left: 'calc(50vw + 86px)'
            }
          : { display: 'flex', height: '25px' }
      }
    >
      <Loader size={size} color={color} styles={{ root: { margin: '0 auto' } }} />
    </div>
  )
}
