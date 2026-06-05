const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Sample Data
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000
    }
];

// CREATE Product
app.post("/products", (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({
            message: "Name and Price are required"
        });
    }

    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        price
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product created successfully",
        data: newProduct
    });
});

// READ All Products
app.get("/products", (req, res) => {
    res.status(200).json(products);
});

// READ Single Product
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
});

// UPDATE Product
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price } = req.body;

    product.name = name || product.name;
    product.price = price || product.price;

    res.status(200).json({
        message: "Product updated successfully",
        data: product
    });
});

// DELETE Product
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.splice(index, 1);

    res.status(204).send();
});

// Home Route
app.get("/", (req, res) => {
    res.send("Product CRUD API is running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
