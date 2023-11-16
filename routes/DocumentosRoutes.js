import { Router } from "express";
import { XMLController, PDFController } from "../controllers/DocumentosController.js";

const router = Router();

router.get('/Archivos/XML',XMLController);

router.get('/Archivos/PDF',PDFController);

export const DocumentosRoutes = router;