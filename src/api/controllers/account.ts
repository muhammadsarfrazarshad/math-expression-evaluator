import asyncHandler from "../../helpers/asyncHandler";
import { Request, Response } from "express";
import { SuccessResponse } from "../../core/ApiResponse";

export const evaluate = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    return new SuccessResponse("Evaluated", {}).send(res);
  }
);
