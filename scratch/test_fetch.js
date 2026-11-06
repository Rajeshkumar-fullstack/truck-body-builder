async function test() {
  try {
    const res = await fetch("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80", { method: "HEAD" });
    console.log("Status:", res.status, res.headers.get("content-type"));
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
}
test();
