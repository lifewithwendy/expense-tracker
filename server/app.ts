import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoutes } from './routes/expenses'

const app = new Hono();
//middlewear
app.use('*', logger())
//index route
app.get('/', (c) => {
    return c.json({"message": "Hello, world!"})
})

app.route('/api/expenses', expensesRoutes)

export default app