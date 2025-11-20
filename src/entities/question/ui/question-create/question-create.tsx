import { Flex, Textarea, Input, InputBase, Combobox, useCombobox, Grid, TextareaProps, ActionIcon } from '@mantine/core'
import { FC, ReactNode } from 'react'
import angle from './images/angle.svg'
import classes from './styles/styles.module.scss'
import { IconPencil, IconTrashXFilled } from '@tabler/icons-react'

const types = [
  { text: '1-9', value: 'score' },
  { text: 'Да-нет', value: 'consentGiven' },
  { text: 'Плохо-прекрасно', value: 'ratingScale' }
]

interface TypeInputProps {
  value?: string
  onChange: (value: string) => void
  error?: ReactNode
}

export interface IQuestionCreateProps {
  title: string
  textInputProps: TextareaProps
  typeInputProps: TypeInputProps
  onOpenButtons: () => void
  onDelete: () => void
  editNotAllowed?: boolean
}

export const QuestionCreate: FC<IQuestionCreateProps> = ({
  title,
  textInputProps,
  typeInputProps,
  onOpenButtons,
  onDelete,
  editNotAllowed
}) => {
  const combobox = useCombobox()

  const selectedOption = typeInputProps.value ? types.find(item => item.value === typeInputProps.value) : undefined

  const options = types.map(item => (
    <Combobox.Option value={item.value} key={item.value}>
      {item.text}
    </Combobox.Option>
  ))

  return (
    <Grid gutter={10}>
      <Grid.Col span={12}>
        <span className={classes.title}>{title}</span>
      </Grid.Col>
      <Grid.Col span={12}>
        <Flex direction={'row'} gap={'5px'} align="center">
          <Combobox
            width={200}
            store={combobox}
            onOptionSubmit={val => {
              typeInputProps.onChange(val)
              combobox.closeDropdown()
            }}
          >
            <Combobox.Target>
              <InputBase
                classNames={{ input: classes.input }}
                component="button"
                type="button"
                pointer
                rightSection={<img src={angle} width={12} height={7} />}
                rightSectionPointerEvents="none"
                onClick={() => combobox.toggleDropdown()}
                error={typeInputProps.error}
                disabled
                mr={'13px'}
              >
                {selectedOption ? selectedOption.text : <Input.Placeholder>Тип вопроса</Input.Placeholder>}
              </InputBase>
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
          <ActionIcon
            onClick={e => {
              e.preventDefault()
              onOpenButtons()
            }}
            aria-label="Выбарть вопрос"
            style={{
              '--hover-bg': 'transparent'
            }}
            className={classes['icon-button']}
            disabled={editNotAllowed}
          >
            <IconPencil color={editNotAllowed ? 'gray' : '#06121E'} size={20} />
          </ActionIcon>
          <ActionIcon
            onClick={onDelete}
            aria-label="Удалить вопрос"
            style={{
              '--hover-bg': 'transparent'
            }}
            className={classes['icon-button']}
            disabled={editNotAllowed}
          >
            <IconTrashXFilled color={editNotAllowed ? 'gray' : '#06121E'} size={20} />
          </ActionIcon>
        </Flex>
      </Grid.Col>
      <Grid.Col span={8.5}>
        <Textarea autosize classNames={{ input: classes.textarea }} {...textInputProps} disabled />
      </Grid.Col>
    </Grid>
  )
}
