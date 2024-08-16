const request = require("supertest");
import { app } from "../server";
import { Avaliacao } from "../models/Avaliacao";

describe("Teste da Rota incluirAvaliacao", () => {
  let avaliacaoId: number;

  it("Deve incluir uma nova avaliação com sucesso", async () => {
    const novaAvaliacao = {
      detalheAvaliacao: "avaliacao",
      nota: 5,
      id_cliente: 109,
      id_pedido: 7,
    };

    const response = await request(app).post("/incluirAvaliacao").send(novaAvaliacao);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.detalheAvaliacao).toBe(novaAvaliacao.detalheAvaliacao);
    expect(response.body.nota).toBe(novaAvaliacao.nota);
    expect(response.body.id_cliente).toBe(novaAvaliacao.id_cliente);
    expect(response.body.id_pedido).toBe(novaAvaliacao.id_pedido);

    avaliacaoId = response.body.id;
  });

  afterAll(async () => {
    if(avaliacaoId) {
      await Avaliacao.destroy({ where: { id: avaliacaoId } });
    }
  });
});

describe("Teste da Rota getAvaliacaoById", () => {
  it("Deve retornar a avaliacao correta quando o id é válido", async () => {
    const idAvaliacao = 3;
    const response = await request(app).get(`/avaliacao/${idAvaliacao}`);

		console.log(response.body);
		
    expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", idAvaliacao);
  });

  it("Deve retornar um status 404 quando o Id da avaliacao não existe", async () => {
    const idAvaliacao = 999;

    const response = await request(app).get(`/avaliacao/${idAvaliacao}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Avaliacao não encontrada");
  });
});

describe("Teste da Rota listarAvaliacoes", () => {
  it("Deve retornar uma lista de avaliacoes", async () => {
    const response = await request(app).get("/avaliacoes");

    expect(response.status).toBe(200);
    expect(response.body.avaliacoes).toBeInstanceOf(Array);
  });

  it("Deve retornar a lista de avaliacoes dentro de um tempo aceitável", async () => {
    const start = Date.now();
    const response = await request(app).get("/avaliacoes");
    const duration = Date.now() - start;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(100);
  });
});

describe("Teste da Rota excluirAvaliacao", () => {
  let avaliacaoId: number;

  beforeAll(async () => {
		const avaliacao = await Avaliacao.create({
			detalheAvaliacao: "mto bommmm",
			nota: 5,
			id_cliente: 109,
			id_pedido: 7
		});
		avaliacaoId = avaliacao.id;
  });

  afterAll(async () => {
    await Avaliacao.destroy({ where: { id: avaliacaoId } });
  });

  it("Deve excluir uma avaliacao existente", async () => {
    const response = await request(app).delete(`/excluirAvaliacao/${avaliacaoId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Avaliacao excluída com sucesso");

    const avaliacaoExcluida = await Avaliacao.findByPk(avaliacaoId);
    expect(avaliacaoExcluida).toBeNull();
  });
});