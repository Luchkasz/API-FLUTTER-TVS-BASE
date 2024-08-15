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

export const getAvaliacaoById = async (req: Request, res: Response) => {
  try {
    const avaliacaoId = parseInt(req.params.id, 10);
    const avaliacao = await Avaliacao.findByPk(avaliacaoId);

    if(avaliacao) {
      res.json(avaliacao);
    } 
		else {
      res.status(404).json({ message: "Avaliacao não encontrada" });
    }
  } 
	catch (error) {
    console.error("Erro ao buscar avaliacao:", error);
    res.status(500).json({ message: "Erro ao buscar avaliacao" });
  }
};

export const listarAvaliacaoes = async (req: Request, res: Response) => {
  try {
    const avaliacoes = await Avaliacao.findAll();
    res.json({ avaliacoes });
  } 
	catch (error) {
    console.error("Erro ao listar avaliacoes:", error);
    res.status(500).json({ message: "Erro ao listar avaliacoes" });
  }
};

export const atualizarAvaliacao = async (req: Request, res: Response) => {
  try {
    const avaliacaoId = parseInt(req.params.id, 10);
    const { detalheAvaliacao, nota } = req.body;

    const avaliacao = await Avaliacao.findByPk(avaliacaoId);

    if(avaliacao) {
      await avaliacao.update({ detalheAvaliacao, nota });
      res.json(avaliacao);
    } 
		else {
      res.status(404).json({ message: "Avaliacao não encontrado" });
    }
  } 
	catch (error) {
    console.error("Erro ao atualizar avaliacao:", error);
    res.status(500).json({ message: "Erro ao atualizar avaliacao" });
  }
};