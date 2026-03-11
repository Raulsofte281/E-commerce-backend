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
};


async function deleteUser(id: string): Promise<any>{
    try {

      const result = await db.query('DELETE FROM public.user WHERE id = $1', [parseInt(id)]);
      if (result.rowCount === 0) {
        throw new Error('Usuário não encontrado');
    }
    } catch (error) {
        console.error('Erro ao deletar usuario:', error);
        return 'Erro ao deletar usuario'; 
    }
}

async function getUser(id: string): Promise<any> {
    try{
       const result = await db.query('SELECT * FROM public.user WHERE id = $1', [parseInt(id)]);
       return result.rows[0]
    }catch(error){
        console.error('erro ao buscar usuario', error)
        throw error;
    }
    
}

async function updateUser(id: string, name: string, balance: string): Promise<any> {
    try{
        const result = await db.query('UPDATE public.user SET name = $1, balance = $3 WHERE id = $2', [name, parseInt(id), parseInt(balance)])
        return await getUser(id)
    }catch(error) {
        console.error('erro ao atualizar usuario', error)
        throw error;
    }
    
}

export const userService = {
    createUser: (name: string, id: string, balance: string) => createUser(name, id, balance),
    deleteUser: (id: string) => deleteUser(id),
    getUser: (id: string) => getUser(id),
    updateUser: (name: string, id: string, balance: string) => updateUser(name, id, balance)
    }