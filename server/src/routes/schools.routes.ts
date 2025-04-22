import { listNearbySchools, registerSchool } from "../controllers/schools.controller";
import { validateData } from "../middlewares/validator";
import { CreateSchoolSchema } from "../models/schools.model";

const express = require('express');

const router = express.Router()

router.post("/addSchool", validateData(CreateSchoolSchema), registerSchool);
router.get("/listSchools", listNearbySchools);

module.exports = router;