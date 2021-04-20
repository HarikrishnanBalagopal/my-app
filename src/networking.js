async function getProducts() {
    const url = "/api/products";
    const res = await fetch(url);
    if (!res.ok)
        throw new Error(
            `Failed to fetch the list of products. Status: ${res.status}`
        );
    return res.json();
}

async function addProduct(newProduct) {
    const url = "/api/products";
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
    });
    if (!res.ok) {
        if (res.status === 403) return 403;
        const errors = await res.json();
        throw new Error(
            `Failed to create the product ${JSON.stringify(
                newProduct
            )}. Status: ${res.status}. ${JSON.stringify(errors)}`
        );
    }
}

async function deleteProduct(id) {
    const url = `/api/products/${id}`;
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) {
        if (res.status === 403) return 403;
        throw new Error(
            `Failed to delete the product with id ${id}. Status: ${res.status}.`
        );
    }
}

async function login(username, password) {
    const url = "/api/login/";
    const credentials = { username, password };
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    if (!res.ok) {
        throw new Error(`Failed to login. Status: ${res.status}.`);
    }
}

async function logout() {
    const url = "/api/logout";
    const res = await fetch(url, { method: "POST" });
    if (!res.ok) {
        throw new Error(`Failed to logout. Status: ${res.status}.`);
    }
}

export { getProducts, addProduct, deleteProduct, login, logout };
