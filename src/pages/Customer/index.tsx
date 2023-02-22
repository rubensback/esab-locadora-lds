import { CustomerContainer, InputsContainer } from './styles'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from '../../components/inputs/TextInput'
import { Button } from '../../components/Button'
import { useCallback } from 'react'
import { api } from '../../api'
import { toast } from 'react-toastify'

const newCustomerValidationSchema = zod.object({
  name: zod.string().min(1),
  phone: zod.string().min(1),
})

type NewCustomerFormData = zod.infer<typeof newCustomerValidationSchema>

export const Customer = () => {
  const newCustomerForm = useForm<NewCustomerFormData>({
    resolver: zodResolver(newCustomerValidationSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  })

  const { register, handleSubmit, reset } = newCustomerForm

  const handleCreateCustomer = useCallback(
    async (formValues: NewCustomerFormData) => {
      try {
        const { name, phone } = formValues
        await api.post('customers', {
          name,
          phone,
          fine: 0,
          discount: 0,
        })

        toast.success('Locador adicionado!')
        reset()
      } catch (error) {}
    },
    [reset],
  )

  return (
    <CustomerContainer onSubmit={handleSubmit(handleCreateCustomer)}>
      <FormProvider {...newCustomerForm}>
        <InputsContainer>
          <TextInput
            id="name"
            label="Nome"
            placeholder="Digite o nome do locador"
            register={register('name')}
          />
          <TextInput
            id="phone"
            label="Telefone"
            placeholder="Digite o telefone do locador"
            register={register('phone')}
          />
        </InputsContainer>
        <Button label="Cadastrar" type="submit" />
      </FormProvider>
    </CustomerContainer>
  )
}
