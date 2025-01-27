import nProgress from "nprogress";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../utils/api";
import { IChildren, IDiaNaoUtil, IDiaNaoUtilContext, toastConfig } from "../utils/interfaces";

export const DiaNaoUtilContext = createContext({} as IDiaNaoUtilContext);

export const DiaNaoUtilProvider = ({ children }: IChildren ) => {

    const [ diasNaoUteis, setDiasNaoUteis ] = useState<IDiaNaoUtil[]>([])
    const navigate = useNavigate();

    const getDiaNaoUtil = async () => {
        try {
            nProgress.start();
            const { data } = await api.get('/dia-nao-util?pagina=0&tamanho=20')

            console.log(data.elementos)
            
            setDiasNaoUteis(data.elementos)

        } catch (error) {
            console.error(error);
            toast.error('Algo de errado aconteceu, por favor tente novamente.')
            
        } finally {
            nProgress.done();
            
        }
    }

    const postDiaNaoUtil = async (data: IDiaNaoUtil) => {
        try {
            nProgress.start()
            console.log(data);

            if(data.repeticaoAnual === true) {
                data.repeticaoAnual = 'ATIVO'
            } else {
                data.repeticaoAnual = 'INATIVO'
            }
            
            await api.post('/dia-nao-util', data)
            toast.success('Dia Não Útil cadastrado com sucesso!', toastConfig)

            navigate('/gestao/dias-nao-uteis')

        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao cadastrar um Dia Não Útil!', toastConfig)

        } finally{  
            nProgress.done()

        }
    }

    const deleteDiaNaoUtil = async (idDiaNaoUtil: number) => {
        try {
            nProgress.start()
            await api.delete(`/dia-nao-util/${idDiaNaoUtil}`)
            toast.success('Dia Não Útil removido com sucesso!', toastConfig)
            getDiaNaoUtil()

        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao remover um Dia Não Útil!', toastConfig)

        } finally {
            nProgress.done()

        }
    }

    const putDiaNaoUtil = async (data: IDiaNaoUtil) => {
        try {
            nProgress.start()
            await api.put(`/dia-nao-util/${data.idDiaNaoUtil}`, data)
            toast.success('Dia Não Útil atualizado com sucesso!', toastConfig)

            navigate('/gestao/dias-nao-uteis')

        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao atualizado um Dia Não Útil!', toastConfig)

        } finally {
            nProgress.done();

        }
    }

    return(
        <DiaNaoUtilContext.Provider value={{ diasNaoUteis, getDiaNaoUtil, postDiaNaoUtil, deleteDiaNaoUtil, putDiaNaoUtil }}>
            { children }
        </DiaNaoUtilContext.Provider>
    )
}
