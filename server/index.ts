import app from './app.ts'
Bun.serve({
    hostname: "localhost",
    fetch: app.fetch,
});
console.log("server running !");
