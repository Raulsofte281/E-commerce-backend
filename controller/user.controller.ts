import type { Request, Response } from "express";
import { userService} from "../service/user.service.js"

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
            console.error('Erro ao cadastrar aluno:', error);
            res.status(500).send('Ocorreu um erro no servidor ao tentar cadastrar o aluno.');
        }
    }
}

export default userController