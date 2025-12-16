import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { 
  getAllInsights,
  getTrendInsights,
  getForecastInsights,
  getTopPerformers
} from '../controllers/insights.controller';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getAllInsights);
router.get('/trends', getTrendInsights);
router.get('/forecast', getForecastInsights);
router.get('/top-performers', getTopPerformers);

export default router;
