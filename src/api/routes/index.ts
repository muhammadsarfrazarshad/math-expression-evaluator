import { Request, Response, Router } from "express";
import { environment } from "../../config";
import { evaluate } from "../controllers";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    environment,
    message: `Welcome to Math Express Evaluator`
  });
});

router.get("/evaluate", evaluate);

export default router;
