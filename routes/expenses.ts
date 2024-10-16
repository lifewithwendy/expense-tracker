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

export const expensesRoutes = new Hono()

// Get all expenses
.get('/', (c) => {
    return c.json({ expenses: fakeExpenses });
})

// Add a new expense
.post('/', zValidator("json",postSchema),async (c) => {//this will validate data before it reaches the handler
    // Parse the incoming JSON request body
    const data = await c.req.valid("json");
    const newExpense = postSchema.parse(data);//check data on runtime
    // Log the new expense for debugging purposes
    console.log(newExpense);

    // Add the new expense to the array (simulating a database save)
    // fakeExpenses.push((String)Math.random(),newExpense...);

    // Return the actual newExpense object in the response, not a string
    return c.json({ message: 'Expense added', expense: newExpense });
})

// Delete an expense by id
.delete('/:id', (c) => { 
    return c.json({ message: 'Expense deleted' });
});
