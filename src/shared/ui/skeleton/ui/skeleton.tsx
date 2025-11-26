import { Skeleton, Flex } from '@mantine/core'

export function Sceleton() {
  return (
    <>
      <Flex direction="column" gap="13px" styles={{ root: { marginBlockStart: '9px' } }}>
        <Skeleton height={19} width={621} />
        <Skeleton height={19} width={536} />
        <Skeleton height={19} width={621} />
        <Skeleton height={19} width={536} />
        <Skeleton height={19} width={621} />
        <Skeleton height={19} width={536} />
        <Skeleton height={19} width={621} />
        <Skeleton height={19} width={536} />
        <Skeleton height={19} width={621} />
        <Skeleton height={19} width={536} />
        <Skeleton height={19} width={621} />
        <Skeleton height={19} width={536} />
        <Skeleton height={19} width={621} />
        <Skeleton height={19} width={536} />
      </Flex>
    </>
  )
}
