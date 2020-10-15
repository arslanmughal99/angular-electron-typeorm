import { ConnectionOptions } from "typeorm";
import entities from "./root.entities";

// Configure your TypeOrm connection Here
export default {
  port: 5432,
  database: "pos",
  type: "postgres",
  host: "localhost",
  synchronize: true,
  username: "posuser",
  password: "adminadmin",
  entities: [...entities],
} as ConnectionOptions;
