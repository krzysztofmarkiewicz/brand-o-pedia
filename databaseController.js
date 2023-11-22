import {
    writeFile,
    readFile
} from "fs"

// const baseUrl = './database/database.json'
const baseUrl = './database/database.json'

class databaseController {

    async updateDatabase(req, res) {
        try {
            res.status(200).end()
            const root = req.body.root
            const id = req.body.id
            const key = req.body.key
            const content = req.body.content


            console.log({
                root: root,
                id: id,
                key: key,
                content: content
            });

            readFile(baseUrl, (error, data) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const parsedData = JSON.parse(data);
                console.log(parsedData);
                const numOfElements = parsedData[root].map(e => {
                    console.log(e.id);
                    return e.id
                })
                const index = numOfElements.indexOf(id)

                parsedData[root][index][key] = content
                writeFile(baseUrl, JSON.stringify(parsedData, null, 2), (err) => {
                    if (err) {
                        console.log("Failed to write updated data to file");
                        return;
                    }
                    console.log("Updated file successfully");
                });
            })

        } catch (error) {
            console.log(error);

        }
    }

    async addElementToDataBase(req, res) {
        try {
            res.status(200).end()

            const root = req.body.root
            const newElement = req.body.newElement
            console.log(newElement.id);

            readFile(baseUrl, (error, data) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const parsedData = JSON.parse(data);

                parsedData[root].push(newElement)

                writeFile(baseUrl, JSON.stringify(parsedData, null, 2), (err) => {
                    if (err) {
                        console.log("Failed to write updated data to file");
                        return;
                    }
                    console.log("Updated file successfully");
                });
            })

        } catch (error) {
            console.log(error);

        }
    }

    async addNewLinetoElement(req, res) {
        try {
            res.status(200).end()
            const root = req.body.root
            const id = req.body.id
            const key = req.body.key
            const value = req.body.value

            console.log({
                root: root,
                id: id,
                key: key,
                value: value
            });
            readFile(baseUrl, (error, data) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const parsedData = JSON.parse(data);
                parsedData[root].forEach(e => {
                    if (e.id === id) {
                        Object.assign(e, {
                            [key]: value
                        })
                    }
                })
                writeFile(baseUrl, JSON.stringify(parsedData, null, 2), (err) => {
                    if (err) {
                        console.log("Failed to write updated data to file");
                        return;
                    }
                    console.log("Updated file successfully");
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    async deleteElementFromDataBase(req, res) {
        try {
            res.status(200).end()

            const root = req.body.root
            const id = req.body.id


            readFile(baseUrl, (error, data) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const parsedData = JSON.parse(data);

                let indexArrayToDel

                parsedData[root].forEach(e => {
                        if (e.id === id) {
                            indexArrayToDel = parsedData[root].indexOf(e)
                        }
                    }

                )

                parsedData[root].splice(indexArrayToDel, 1)
                writeFile(baseUrl, JSON.stringify(parsedData, null, 2), (err) => {
                    if (err) {
                        console.log("Failed to write updated data to file");
                        return;
                    }
                    console.log("Updated file successfully");
                });
            })

        } catch (error) {
            console.log(error);

        }
    }



    async getWholeDatabase(req, res) {
        readFile(baseUrl, (err, data) => {
            if (err) {
                res.status(500).send(`Błąd odczytu pliku: ${err}`)
                console.error('Błąd odczytu pliku JSON:', err);
                return;
            }
            try {
                const jsonData = JSON.parse(data);
                res.send(jsonData)
            } catch (error) {
                res.status(500).send(`Błąd odczytu z bazy danych`)
                console.error('Błąd parsowania danych JSON:', error);
            }
        })
    }

    //gets element od 
    async getElemOfDB(req, res) {
        readFile(baseUrl, (err, data) => {
            if (err) {
                res.status(500).send(`Błąd odczytu z bazy danych`)
                console.error('Błąd odczytu pliku JSON:', err);
                return
            }
            try {
                const levelOfDB = (req.query.level).toLowerCase();
                const name = (req.query.name).toLowerCase();
                const jsonData = JSON.parse(data)
                let elementToSend = []
                const elemOfDB = jsonData[levelOfDB].map(e => {
                    if (e.name.toLowerCase() === name) {
                        elementToSend.push(e)
                    }
                })
                if (elementToSend.length === 1) {
                    res.send(elementToSend[0])
                } else if (elementToSend.length > 1) {
                    console.log(`Błąd bazy danych. W bazie danych znajdują się ${elementToSend.length} elementy z kluczen "name". Klucz "name" powinien być unikalny.`);

                    res.status(404).send(`Błąd bazy danych. W bazie danych znajdują się ${elementToSend.length} elementy z kluczen "name". Klucz "name" powinien być unikalny.`)
                } else {
                    console.log(`Brak w bazie danych elementu z kluczem "name"`);
                    res.status(404).send(`Brak w bazie danych elementu z kluczem "name"`)
                }

            } catch (err) {
                res.status(500).send(`Błąd odczytu z bazy danych`)
                console.error('Błąd parsowania danych JSON:', err);
            }
        })
    }
    async getOrderingSteps(req, res) {
        readFile(baseUrl, (err, data) => {
            if (err) {
                res.status(500).send(`Błąd odczytu z bazy danych`)
                console.error('Błąd odczytu pliku JSON:', err);
                return
            }
            try {
                const name = (req.query.name)
                const jsonData = JSON.parse(data)

                jsonData.ordering.forEach(e => {
                    if (e.name === name) {
                        res.status(200).send(e)
                        // res.send(e)
                    } else {
                        res.status(404).send({step:'TA MARKA NIE MA DODANEJ INSTRUKCJI ZAMAWIANIA'})
                    }
                })
            } catch (err) {
                res.status(500).send(`Błąd odczytu z bazy danych`)
                console.error('Błąd parsowania danych JSON:', err);
            }
        })
    }
    async getNumberOfOrderingSteps(req, res) {
        readFile(baseUrl, (err, data) => {
            if (err) {
                res.status(500).send(`Błąd odczytu z bazy danych`)
                console.error('Błąd odczytu pliku JSON:', err);
                return
            }
            try {
                const id = (req.query.key)
                const jsonData = JSON.parse(data)

                let elem
                jsonData.ordering.forEach(e => {
                    if (e.id === id) {
                        elem = e
                    }
                })
                const keysArr = []
                for (const key in elem) {
                    keysArr.push(key)
                }
                const countSteps = (e) => {
                    if (e.includes('step'))
                        return e
                }
                const steps = {
                    steps: keysArr.filter(countSteps).length
                }
                console.log(steps);

                res.send(steps)
            } catch (err) {
                res.status(500).send(`Błąd odczytu z bazy danych`)
                console.error('Błąd parsowania danych JSON:', err);
            }

        })
    }


    async deleteLastStep(req, res) {
        try {
            res.status(200).end()

            const root = req.body.root
            const id = req.body.id

            readFile(baseUrl, (error, data) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const parsedData = JSON.parse(data);

                parsedData.ordering.forEach(el => {
                    if (el.id === id) {
                        const keysArr = []
                        for (const key in el) {
                            keysArr.push(key)
                        }
                        const lastStep = keysArr.pop()
                        if (keysArr.includes('step1')) {
                            delete el[lastStep];
                        }
                    }
                })
                writeFile(baseUrl, JSON.stringify(parsedData, null, 2), (err) => {
                    if (err) {
                        console.log("Failed to write updated data to file");
                        return;
                    }
                    console.log("Updated file successfully");
                });
            })

        } catch (error) {
            console.log(error);

        }
    }

    async getListsofElementsByKeyFromDB(req, res) {


        readFile(baseUrl, (err, data) => {
            if (err) {
                res.status(500).send(`Błąd odczytu z bazy danych`)
                console.error('Błąd odczytu pliku JSON:', err);
                return
            }
            try {
                const levelOfDB = (req.query.level).toLowerCase();
                const key = (req.query.key).toLowerCase();

                const jsonData = JSON.parse(data)
                let listOfelementsToSend = []
                class elemOfList {
                    constructor(id, key) {
                        this.key = key
                        this.id = id
                    }
                }
                const listOfElemOfDB = jsonData[levelOfDB].map(e => {
                    const newElementOfList = new elemOfList(e.id, e[key])
                    const element = Object.assign({}, newElementOfList)
                    listOfelementsToSend.push(element)
                })
                const list = {
                    elements: listOfelementsToSend
                }

                if (list.elements.length > 0) {
                    res.send(list)
                } else {
                    res.send({
                        elements: [{
                            key: '0',
                            id: '0'
                        }]
                    })

                    // console.log(`Baza jest pusta`);
                    // res.status(404).send()
                }

            } catch (err) {
                res.status(500).send(`Błąd odczytu z bazy danych`)
                console.error('Błąd parsowania danych JSON:', err);
            }

        })
    }
}

export default new databaseController