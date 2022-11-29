import React, { useContext, useState } from 'react'
import styles from './GestaoCadastrarEdicao.module.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Box, TextField, Button, Stack } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { IEdicao } from '../../../utils/interfaces'
import { useForm } from 'react-hook-form'
import { cadastrarEdicaoFormSchema } from '../../../utils/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UserContext } from '../../../context/UserContex'


const isWeekend = (date: Dayjs) => {
  const day = date.day()

  return day === 0 || day === 6
}

export const GestaoCadastrarEdicao = () => {

  const { createEdicao } = useContext(UserContext);

  const [inicial, setInicial] = React.useState<Dayjs | null>()
  const [final, setFinal] = React.useState<Dayjs | null>()

  const { register, handleSubmit,  formState: { errors }} = useForm<IEdicao>(({
    resolver: yupResolver(cadastrarEdicaoFormSchema)
  }))

  return (
    <>
    <GestaoHeader />
      <section className={styles.ContainerSection}>
        <div className={styles.ContainerTitle}>
          <h2>Cadastrar Edição</h2>
        </div>

        <div className={styles.ContainerCalendario}>
          <form onSubmit={handleSubmit((data: IEdicao) => createEdicao(data))}>
            <div className={styles.ContainerNomeEdicao}>
              <TextField
                id="nome"
                label="Nome da edição"
                variant="standard"
                className={styles.NomeEdicao}
                {...register('nome')}
              />
            </div>
            <div className={styles.ContainerMenorCalendario}>
              <Box>
                <p>Início</p>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
                  <DatePicker
                    label="Basic example"
                    value={inicial}
                    onChange={(newValue) => {
                      setInicial(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} id={'dataInicial'} {...register('dataInicial')} />}
                  />
                </LocalizationProvider>


                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
                  <DatePicker
                    label="Basic example"
                    value={final}
                    onChange={(newValue) => {
                      setFinal(newValue);
                    }}
                    renderInput={(params) => <TextField {...params}  id={'dataFinal'} {...register('dataFinal')}/>}
                  />
                </LocalizationProvider>
              </Box>
            </div>
            
            <Button
              className={styles.loginText}
              type="submit"
              variant="contained"
              id="button-login"
              sx={{ mt: 3, mb: 2, backgroundColor: '#1e62fe' }}
            >
              Enviar
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}
