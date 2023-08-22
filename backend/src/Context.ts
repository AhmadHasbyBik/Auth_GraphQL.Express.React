import { Request, Response } from "express";

export interface NodeContext {
  req: Request;
  res: Response;
  payload?: { userId:string };
}