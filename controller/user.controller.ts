import type { Request, Response } from "express";
import {userService} from "../service/user.service.js"

 const userController = {   
    createUser: async (req: Request, res: Response): Promise<void> => {
        const { name, id, balance } = req.body;

        try {
            const retorno = await userService.createUser(name, id, balance);
            if (!retorno) {
                res.status(500).send('Não foi possível cadastrar o usuario.');
            } else {
                res.status(200).send(retorno);
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuario:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o usuario.');
        }
    },

     deleteUser: async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id as string;        
        try {
        if (!id) {
            res.status(400).send('ID não fornecido');
            return;
        }
        await userService.deleteUser(id);
        res.status(200).json({ message: `Usuário com id ${id} deletado com sucesso` });
    } catch (error: any) {
        if (error.message === 'Usuário não encontrado') {
            res.status(404).send(error.message);
        } else {
            console.error('Erro detalhado no controller:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar deletar o usuario.');
        }
    }
    },

    getUser: async (req: Request, res: Response): Promise<any> => {
        const id = req.params.id as string;        

        try {
            if (!id) {
                res.status(400).send('ID não fornecido');
            }
            const retorno = await userService.getUser(id);
            res.status(200).json(retorno); 
            
        } catch (error: any) {
            if (error.message === 'Usuário não encontrado') {
                res.status(404).send(error.message);
            } else {
                console.error('Erro no controller:', error);
                res.status(500).send('Ocorreu um erro no servidor ao tentar deletar o usuario.');
            }
        }
    },

    updateUser: async (req: Request, res: Response): Promise<any> => {
        const id = req.params.id as string;
        const {name, balance} = req.body

        try{
            if(!id || !name || !balance){
                return res.status(400).send('Prescisa fornecer todas as informaçoes para atualizar o usuario')
            }
            const retorno = await userService.updateUser(id, name, balance);
            res.status(200).json(retorno);
        }
        catch(error:
             any){
             if (error.message === 'Usuário não encontrado') {
                res.status(404).send(error.message);
            } else {
                console.error('Erro no controller:', error);
                res.status(500).send('Ocorreu um erro no servidor ao tentar deletar o usuario.');
            }
        }
    }

}

export default userController