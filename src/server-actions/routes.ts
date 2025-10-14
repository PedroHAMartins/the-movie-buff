import { Request, Response, Router } from 'express';
import { getMovies } from './get';

const router = Router();

/**
 * GET /api/movies - Get popular movies
 */
router.get('/movies', async (req: Request, res: Response) => {
  try {
    const data = await getMovies();
    res.json(data.data);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    res.status(500).json({
      error: 'Failed to fetch movies',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
