import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const getDb = () =>
  open({
    filename: "./data.sqlite",
    driver: sqlite3.Database,
  });
