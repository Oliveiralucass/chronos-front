import React, { useContext } from 'react'
import styles from './GestaoCadastrarDiaNaoUtil.module.css'
import TextField from '@mui/material/TextField'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { Link } from 'react-router-dom'
import { IDiaNaoUtil } from '../../../utils/interfaces'
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { cadastrarDiaNaoUtilFormSchema } from '../../../utils/schemas'


export const GestaoCadastrarDiaNaoUtil = () => {

 const { postDiaNaoUtil } = useContext(DiaNaoUtilContext)


  const { register, handleSubmit,  formState: { errors }} = useForm<IDiaNaoUtil>(({
    resolver: yupResolver(cadastrarDiaNaoUtilFormSchema)
  }))

  return (
    <>
    <GestaoHeader />
      <section className={styles.ContainerSection}>

        <div className={styles.ContainerCalendario}>
          <div className={styles.ContainerTitle}>
            <h2>Cadastrar Período Não Útil</h2>
          </div>

          <form onSubmit={handleSubmit((data: IDiaNaoUtil) => postDiaNaoUtil(data))}>
          <div className={styles.ContainerNomeEdicao}>
            <TextField
              id="descricao"
              label="Descrição do Período Não Útil"
              variant="standard"
              className={styles.NomeEdicao}
              {...register('descricao')}
            />
            {errors.descricao && (<span
              className={styles.ContainerError}
              id="login-error-email"
              >
                {errors.descricao.message}
              </span>
              )}

              <FormControlLabel control={<Checkbox />} label="Repetir todos os anos"  id='repeticaoAnual'  {...register('repeticaoAnual')}/>
          </div>

        
              <Box className={styles.ContainerMenorCalendario}>

                <Box className={styles.dateContainer} >
                  <p>Data Inicial</p>
                  <TextField id="dataInicial" className={styles.dataPicker} type={'date'} variant="standard" {...register('dataInicial')}/>
                  {errors.dataInicial && (<span
                      className={styles.ContainerError}
                      id="login-error-email"
                    >
                      {errors.dataInicial.message}
                    </span>
                  )}
                </Box>

                <Box className={styles.dateContainer}>
                  <p>Data Final</p>
                  <TextField id="dataFinal" className={styles.dataPicker} type={'date'} variant="standard"  {...register('dataFinal')}/>

                </Box>
              </Box>
       

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '220px'}}>
              <Button
                className={styles.submitButton}
                type="submit"
                variant="contained"
                id="button-login" 
                sx={{ mt: 3, mb: 2, backgroundColor: '#1e62fe' }}
                >
                  Enviar
              </Button>
            </Box>
          </form>
        </div>
      </section>
    </>
  )
}
