import { db } from "../app.js";


async function createUser(name: string, id: string, balance: string): Promise<string>{
    try {
        let resposta = "";
        if (!name || !id) {
            resposta = 'name e id são obrigatórios.';
            return resposta;
        }
        else{
            db.query('INSERT INTO public.user (name, id, balance) VALUES ($1, $2, $3)', [name, parseInt(id), parseInt(balance)]);
            resposta = `O nome que preenchemos é ${name} e o id é ${id}, saldo ${balance}`;
            return resposta;
        }
    } catch (error) {
        console.error('Erro ao criar usuario:', error);
        return 'Erro ao cadastrar usuario'; 
    }
}


async function deleteUser(id: string): Promise<string>{
    try {
            db.query('DELETE FROM public.user WHERE id = $1', [parseInt(id)]);
           let resposta = `Usuario deletado com sucesso, id: ${id}`;
            return resposta;
        
    } catch (error) {
        console.error('Erro ao deletar usuario:', error);
        return 'Erro ao deletar usuario'; 
    }
}




export const userService = {
    createUser: (name: string, id: string, balance: string) => createUser(name, id, balance),
    deleteUser: (id: string) => deleteUser(id)
    }