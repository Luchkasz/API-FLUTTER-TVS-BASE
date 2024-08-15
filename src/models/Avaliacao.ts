import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Pedido, PedidoInstance } from "./Pedido";
import { Cliente, ClienteInstance } from "./Cliente";

export interface AvaliacaoInstance extends Model {
  id: number;
  detalheAvaliacao: string;
  nota: number;
  id_cliente: number;
  id_itemPedido: number;
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
      id_cliente: {
        type: DataTypes.INTEGER,
        references: {
          model: Cliente,
          key: "id",
        },
      },
      id_itemPedido: {
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