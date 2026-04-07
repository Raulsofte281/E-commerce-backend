import { db } from "../app.js";

async function getProduct(id: string): Promise<string> {
    
    let resposta;
    try{
        if(!id) {
            resposta = 'id é obrigatório.';
            return resposta;

        }else{
            let result = await db.query("SELECT * FROM public.product WHERE id = $1", [parseInt(id)]);
            return result.rows[0];
        }

    } catch(error){
        console.error('erro ao buscar produto', error)
        return 'erro ao buscar produto';
    }
}

export const paymentManagerService = {
    getProduct: (id: string) => getProduct(id)
}
