import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoutes } from './routes/expenses'
import { serveStatic } from 'hono/bun';

const app = new Hono();
//middlewear
app.use('*', logger())
//index route

const apiRoutes = app.basePath("/api").route('/expenses', expensesRoutes)
//serve the dist file if not api
app.get('*', serveStatic({ root: './frontend/dist' }));
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

export default app;
export type ApiRoutes = typeof apiRoutes;