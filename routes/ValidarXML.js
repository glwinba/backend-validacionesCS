import { Router } from "express";
import { ValidarXMLController } from "../controllers/ValidacionXML.js";

const router = Router();

router.post('/Validaciones/XML',ValidarXMLController);

export const ValidarXML = router;
