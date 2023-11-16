async function getDatabaseFromServer(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

export {getDatabaseFromServer}