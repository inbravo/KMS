import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { strictLimiter } from '../middleware/rateLimiter.middleware';
import { 
  getAllInsights,
  getTrendInsights,
  getForecastInsights,
  getTopPerformers
} from '../controllers/insights.controller';

const router = Router();

// All routes require authentication and have strict rate limiting (expensive queries)
router.use(authMiddleware);
router.use(strictLimiter);

router.get('/', getAllInsights);
router.get('/trends', getTrendInsights);
router.get('/forecast', getForecastInsights);
router.get('/top-performers', getTopPerformers);

export default router;
