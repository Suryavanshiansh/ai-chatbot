import app from "./app.js";

// Port setup
const PORT = process.env.PORT || 5000;


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});