import express from 'express';
import {rateLimit} from 'express-rate-limit';
import { getCompanies, getCompanyById, getCompanyJobListing, getCompanyProfile, register, signIn, updateCompanyProfile } from '../controllers/companiesController.js';

const router = express.Router();
//ip rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 request per 'window (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the 'RateLimit
  legacyHeaders: false, // Disable the 'X-RateLimit 
});

//REGISTER
router.post("/register", limiter, register);

//LOGIN
router.post("/login", limiter, signIn);

router.post("/get-company-profile", userAuth, getCompanyProfile);

router.post("/get-company-jonlisting", userAuth,getCompanyJobListing);

router.get("/", getCompanies);
router.get("/get-company/:id", getCompanyById);

//UPDATE DATA
router.put("/update-company", userAuth, updateCompanyProfile);

export default router;