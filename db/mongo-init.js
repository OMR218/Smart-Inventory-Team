db = db.getSiblingDB("auth_db");
db.createCollection("accounts");

db = db.getSiblingDB("product_db");
db.createCollection("products");

db.products.insertMany([
	{
		name: "Notebook",
		price: 12.5,
		quantity: 25,
		imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&q=80"
	},
	{
		name: "Wireless Mouse",
		price: 24.99,
		quantity: 15,
		imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=300&q=80"
	},
	{
		name: "Backpack",
		price: 45.0,
		quantity: 8,
		imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80"
	}
]);
