import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [products, setProducts] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await axios.get(
					"http://localhost:5000/api/products"
				);
				setProducts(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchProducts();
	}, []);

	const addProduct = async () => {
		try {
			const res = await axios.post("http://localhost:5000/api/products", {
				title,
				description,
				price,
			});
			console.log(res);
			setProducts((prev) => [...prev, res.data.product]);
			setTitle("");
			setDescription("");
			setPrice("");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App">
			<h1>Menu</h1>
			<input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)}/>
			<br />
			<textarea placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
			<br />
			<input type="text" placeholder="Price" value={price} onChange={(event) => setPrice(event.target.value)} />
			<br />
			<button onClick={addProduct}>Add</button>
			<ul>
				{products.map((product, idx) => (
					<li key={idx}>{product.title}, {product.description}, {product.price}</li>
				))}
			</ul>
		</div>
	);
}

export default App;