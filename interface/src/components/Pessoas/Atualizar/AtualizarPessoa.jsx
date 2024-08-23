// imports
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import './AtualizarPessoa.css'; // Importa estilos CSS específicos para este componente
import PessoasRequests from "../../../fetch/PessoasRequests";
import { formatarData } from "../../../util/Utilitario";

/**
 * Componente com o formulário para atualizar os dados do pessoa
 */
function AtualizarPessoa() {

    const navigate = useNavigate();

    const location = useLocation();

    const objPessoa = location.state.objeto;

    const [pessoa, setPessoa] = useState({
        id: objPessoa.id,
        nome: objPessoa.nome,
        cpf: objPessoa.cpf,
        dataNascimento: formatarData(new Date(objPessoa.dataNascimento)),
        telefone: objPessoa.telefone,
        endereco: objPessoa.endereco,
        altura: objPessoa.altura,
        peso: objPessoa.peso
    })

    // Função para atualizar os valores conforme os inputs do formulário são preenchidos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPessoa(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Função para atualizar os dados do pessoa no banco de dados
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (await PessoasRequests.atualizarPessoa(pessoa)) {
            // se a função executou sem nenhum problema, é exibido um alerta confirmando a alteração para o usuário
            window.alert(`pessoa ${pessoa.nome} atualizado com sucesso`);
            // redireciona o usuário para a página de listagem de pessoas
            navigate(`/Listagem`, { replace: true });
        } else {
            // caso a funçao atualizarpessoa retorne algum erro, é exibido um log
            console.log('Erro ao atualizar dados do pessoa');
        }
    }

    return (
        <>
            <h1>Atualizar Pessoa</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="nome"
                        value={pessoa.nome}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="cpf"
                        value={pessoa.cpf}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="date"
                        name="dataNascimento"
                        value={pessoa.dataNascimento}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="telefone"
                        value={pessoa.telefone}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="endereco"
                        value={pessoa.endereco}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="altura"
                        value={pessoa.altura}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="peso"
                        value={pessoa.peso}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Enviar</button>
            </form>
        </>
    );
}

export default AtualizarPessoa;