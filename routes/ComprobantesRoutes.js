import { Router } from "express";

import { ComprobantesControler } from "../controllers/ComprobantesController.js";

const router = Router();

router.get('/Comprobantes',ComprobantesControler);

export const ComprobantesRoutes = router;

