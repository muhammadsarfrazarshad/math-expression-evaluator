import { Request, Response, Router } from "express";
import { environment } from "../../config";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    environment,
    message: `Welcome to Math Express Evaluator`
  });
});

export default router;
