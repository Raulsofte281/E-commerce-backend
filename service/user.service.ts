async function createUser(name: string, cpf: string, balance: number): Promise<string>{
    try {
        let resposta = "";
        if (!name || !cpf) {
            resposta = 'name e CPF são obrigatórios.';
            return resposta;
        }
            resposta = `O name que preenchemos é ${name} e o CPF é ${cpf}, saldo ${balance}`;
            return resposta;
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        return 'Erro ao cadastrar aluno'; 
    }
}

export const userService = {
    createUser(name: string, cpf: string, balance: number): Promise<string> {
        return createUser(name, cpf, balance);
    }

    
}