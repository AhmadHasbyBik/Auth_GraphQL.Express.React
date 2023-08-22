import { Response } from "express";

export const RefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
  });
};