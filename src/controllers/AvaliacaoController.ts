import { Request, Response } from "express";
import { Op } from "sequelize";
import { Avaliacao } from "../models/Avaliacao";

export const incluirAvaliacao = async (req: Request, res: Response) => {
	try {
		const { detalheAvaliacao, nota, id_cliente, id_pedido } = req.body;

		const avaliacaoExistente = await Avaliacao.findOne({ where: { id_pedido } });
		
		if(avaliacaoExistente) {
			return res.status(400).json({ message: "Avaliação já realizada" });
		}

		const novaAvaliacao = await Avaliacao.create({ detalheAvaliacao, nota, id_cliente, id_pedido });

		res.status(201).json(novaAvaliacao);
	} 
	catch (error) {
		console.error("Erro ao incluir avaliação:", error);
		res.status(500).json({ message: "Erro ao incluir avaliação" });
	}
};