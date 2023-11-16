import { Router } from "express";
import { ValidarXMLController } from "../controllers/ValidacionXMLController.js";

const router = Router();

router.post('/Validaciones/XML',ValidarXMLController);

export const ValidarXML = router;
