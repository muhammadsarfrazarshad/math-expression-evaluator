import asyncHandler from "../../helpers/asyncHandler";
import { Request, Response } from "express";
import Logger from "../../core/Logger";

export const evaluate = asyncHandler(
  async (req: Request, res: Response): Promise<Response|undefined> => {
    try {
      // @ts-ignore
      return res.status(200).send({result: eval(req.query?.query), error: false});
    } catch (err: any) {
      Logger.error(err);
      return res.status(400).send({message: err?.message || 'Please make sure query is valid', error: true});
    }
  }
);
