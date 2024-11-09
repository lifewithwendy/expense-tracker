import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator'

const fakeExpenses = [
    { id: 1, title: 'Rent', amount: 1000 },
    { id: 2, title: 'Groceries', amount: 200 },
    { id: 3, title: 'Utilities', amount: 150 },
];

const postSchema = z.object({
    title: z.string().min(3).max(50),
    amount: z.number().int().positive(),
});

const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;//creating ts type from zod schema

const createPostSchema = expenseSchema.omit({ id: true })

export const expensesRoutes = new Hono()
// Get all expenses
.get('/', (c) => {
    return c.json({ expenses: fakeExpenses });
})

// Add a new expense
.post('/', zValidator("json", postSchema), async (c) => {//this will validate data before it reaches the handler
    // Parse the incoming JSON request body
    const data = await c.req.valid("json");
    fakeExpenses.push({ id: fakeExpenses.length + 1, ...data });
    console.log(fakeExpenses);

    // Add the new expense to the array (simulating a database save)
    // fakeExpenses.push((String)Math.random(),newExpense...);

    // Return the actual newExpense object in the response, not a string
    return c.json({ message: 'Expense added', expense: fakeExpenses });
})

// Delete an expense by id
.delete('/:id', (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
        return c.json({ message: 'Expense not found' });
    }
    fakeExpenses.splice(index, 1);
    return c.json({ message: 'Expense deleted' });
})

.get('/:id{[0-9]+}', (c) => {//specify its number
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
        // c.notFound();
        return c.json({ message: 'Expense not found' });
    }
    return c.json({ expenses: expense });
})

.get('/totalSpent', (c) => {
    const totalSpent = fakeExpenses.reduce((total, expense) => total + expense.amount, 0);
    return c.json({ totalSpent });
})
