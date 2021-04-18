async function getProducts() {
    const url = "/api/products";
    const res = await fetch(url);
    if (!res.ok)
        throw new Error(
            `Failed to fetch the list of products. Status: ${res.status}`
        );
    return res.json();
}

export { getProducts };
