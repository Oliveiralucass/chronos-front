import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import styles from './GestaoVerificarEdicao.module.css'
import {
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Box,
  Button,
  TableHead,
  Switch,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from '../../../context/UserContex'

export const GestaoVerificarEdicao = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const { deleteEtapa } = useContext(UserContext)

  return (
    <>
    <GestaoHeader />

    <Box sx={{ margin: '50px auto', maxWidth: '1200px', boxShadow: 2, borderRadius: '12px'}}>

      <Box sx={{ display: 'flex', justifyContent:'space-between', padding: '20px', mb: '60px'}}>
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <h2>{state.nome}</h2>
          <p>Gerar Calendario</p>
        </Box>

        <Button variant="contained" onClick={() => navigate('/gestao/verificar-edicao/:edicao/nova-etapa', { state: state })}> + Adicionar nova etapa</Button>
      </Box>
      
      {state.etapas?.map((etapa: any) => {
        return(<Box key={etapa.idEtapa} sx={{padding: '20px'}}> 
          <Box sx={{display: 'flex', alignItems:'center', justifyContent: 'space-between' }}> 
            <Box sx={{display: 'flex', alignItems:'center', gap: '40px' }}> 
              <h3>{etapa.nome}</h3>
              
              <Box sx={{display: 'flex', alignItems:'center', gap: '12px' }}>
                <EditIcon sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                <HighlightOffIcon onClick={() => {deleteEtapa(etapa.idEtapa, state.idEdicao)}} sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
              </Box> 
            </Box>
            
            <Button variant="contained"> + NOVO PROCESSO</Button>
          </Box>
            
          <Box>

          <TableContainer sx={{ boxShadow: 1, width: 'auto', mt: 2, borderRadius: '5px' }}>
            <Table sx={{ minWidth: 650,  }} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell align="justify">Nome</TableCell>
                  <TableCell align="justify">Dias Úteis</TableCell>
                  <TableCell align="justify">Ordem</TableCell>
                  <TableCell align="right">Editar</TableCell>
                  <TableCell align="right">Excluir</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {etapa.processos?.map((processo: any) => {
                  return(<TableRow
                    key={processo.idProcesso}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                  >
                    <TableCell component="th" scope="row" align="justify">
                      {processo.nome}
                    </TableCell>

                    <TableCell component="th" scope="row" align="justify">
                      {processo.diasUteis}
                    </TableCell>

                    <TableCell component="th" scope="row" align="justify">
                      {processo.ordemExecucao}
                    </TableCell>

                    <TableCell component="th" scope="row" align="center" width={'120px'}>
                      <EditIcon sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>
 
                    <TableCell align="right" width={'40px'}>
                      <HighlightOffIcon sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>
                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>

          </Box>
        </Box>
        )
      })}

    </Box>
    </>
  )
}
