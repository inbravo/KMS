import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { apiLimiter } from '../middleware/rateLimiter.middleware';
import { 
  getAllSales, 
  getSalesById, 
  getSalesStats,
  createSalesRecord 
} from '../controllers/sales.controller';

const router = Router();

// All routes require authentication and are rate limited
router.use(authMiddleware);
router.use(apiLimiter);

router.get('/', getAllSales);
router.get('/stats', getSalesStats);
router.get('/:id', getSalesById);
router.post('/', createSalesRecord);

export default router;
