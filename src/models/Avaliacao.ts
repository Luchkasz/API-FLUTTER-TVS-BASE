import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Pedido, PedidoInstance } from "./Pedido";
import { Cliente, ClienteInstance } from "./Cliente";

export interface AvaliacaoInstance extends Model {
  id: number;
  detalheAvaliacao: string;
  nota: number;
  cliente: ClienteInstance;
  itemPedido: PedidoInstance;
}

export const Avaliacao = sequelize.define<AvaliacaoInstance>(
  "Avaliacao",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      detalheAvaliacao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cliente: {
        type: DataTypes.INTEGER,
        references: {
          model: Cliente,
          key: "id",
        },
      },
      itemPedido: {
        type: DataTypes.INTEGER,
        references: {
          model: Pedido,
          key: "id",
        },
      },
    },
    {
      tableName: "avaliacao",
      timestamps: false,
    }
);