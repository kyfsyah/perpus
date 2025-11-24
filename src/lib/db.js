import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: "localhost",       // ganti sesuai MySQL Workbench
  user: "root",
  password: "",
  database: "db_perpustakaan",
  waitForConnections: true,
});
export default db;