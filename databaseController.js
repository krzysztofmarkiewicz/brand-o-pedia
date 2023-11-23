import {
    writeFile,
    readFile
} from "fs"

const baseUrl = process.env.DATABASE_FILE

class databaseController {

    async updateDatabase(req, res) {
        try {
            res.status(200).end()
            const root = req.body.root
            const id = req.body.id
            const key = req.body.key
            const content = req.body.content
            const item = {
                root: root,
                id: id,
                key: key,
                content: content
            }
            console.log(item);

            readFile(baseUrl, (err, data) => {
                if (err) {
                    res.status(500).send(`Error reading from database`)
                    console.error('Error reading JSON file:', err);
                    return;
                }
                const parsedData = JSON.parse(data);
                const numOfElements = parsedData[root].map(e => {
                    return e.id
                })
                const index = numOfElements.indexOf(id)

                parsedData[root][index][key] = content
              
                writeFile(baseUrl, JSON.stringify(parsedData, null, 2), (err) => {
                    if (err) {
                        console.error("Failed to write updated data to file");
                        return;
                    }
                    console.log("Updated file successfully");
                });
            })

        } catch (err) {
            console.error(err);

        }
    }

    async addElementToDataBase(req, res) {
        try {
            res.status(200).end()

            const root = req.body.root
            const newElement = req.body.newElement

            readFile(baseUrl, (err, data) => {
                if (err) {
                    res.status(500).send(`Error reading from database`)
                    console.error('Error reading JSON file:', err);
                    return;
                }
                const parsedData = JSON.parse(data);

                parsedData[root].push(newElement)

                writeFile(baseUrl, JSON.stringify(parsedData, null, 2), (err) => {
                    if (err) {
                        console.error("Failed to write updated data to file");
                        return;
                    }
                    console.log("Updated file successfully");
                });
            })

        } catch (err) {
            console.error(err);

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
            readFile(baseUrl, (err, data) => {
                if (err) {
                    res.status(500).send(`Error reading from database`)
                    console.error('Error reading JSON file:', err);
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
                        console.error("Failed to write updated data to file");
                        return;
                    }
                    console.log("Updated file successfully");
                });
            })
        } catch (err) {
            console.error(err);
        }
    }

    async deleteElementFromDataBase(req, res) {
        try {
            res.status(200).end()

            const root = req.body.root
            const id = req.body.id


            readFile(baseUrl, (err, data) => {
                if (err) {
                    res.status(500).send(`Error reading from database`)
                    console.error('Error reading JSON file:', err);
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
                        console.error("Failed to write updated data to file");
                        return;
                    }
                    console.log("Updated file successfully");
                });
            })

        } catch (err) {
            console.error(err);

        }
    }



    async getWholeDatabase(req, res) {
        readFile(baseUrl, (err, data) => {
            if (err) {
                res.status(500).send(`Error reading from database`)
                console.error('Error reading JSON file:', err);
                return;
            }
            try {
                const jsonData = JSON.parse(data);
                res.send(jsonData)
            } catch (err) {
                res.status(500).send(`Error reading from database`)
                console.error('JSON data parsing error:', err);
            }
        })
    }

    //gets element 
    async getElemfromDB(req, res) {
        readFile(baseUrl, (err, data) => {
            if (err) {
                res.status(500).send(`Error reading from database`)
                console.error('Error reading JSON file:', err);
                return
            }
            try {
                const levelOfDB = (req.query.level).toLowerCase();
                const id = (req.query.id).toLowerCase();
                const jsonData = JSON.parse(data)
                let elementToSend = []

                jsonData[levelOfDB].map(e => {
                    if (e.id === id) {
                        elementToSend.push(e)
                    }
                })

                if (elementToSend.length === 1) {
                    res.send(elementToSend[0])
                } else if (elementToSend.length > 1) {
                    console.error(`Database error. There are ${elementToSend.length} elements in the database with the same ID. The ID key should be unique.`);

                    res.status(404).send(`Database error. There are ${elementToSend.length} elements in the database with the same ID. The ID key should be unique.`)
                } else {
                    console.error(`There is no element with this ID in the database`);
                    res.status(404).send(`There is no element with this ID in the database`)
                }

            } catch (err) {
                res.status(500).send(`Error reading from database`)
                console.error('JSON data parsing error:', err);
            }
        })
    }

    async getNumberOfOrderingSteps(req, res) {
        readFile(baseUrl, (err, data) => {
            if (err) {
                res.status(500).send(`Error reading from database`)
                console.error('Error reading JSON file:', err);
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
                res.send(steps)
            } catch (err) {
                res.status(500).send(`Error reading from database`)
                console.error('JSON data parsing error:', err);
            }

        })
    }

    async deleteLastStep(req, res) {
        try {
            res.status(200).end()

            const root = req.body.root
            const id = req.body.id
            readFile(baseUrl, (err, data) => {
                if (err) {
                    res.status(500).send(`Error reading from database`)
                    console.error('Error reading JSON file:', err);
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
                        console.error("Failed to write updated data to file");
                        return;
                    }
                    console.log(`Deleted a last step from index ${id} in ${root} `);
                    console.log("Updated file successfully");
                });
            })

        } catch (err) {
            console.error(err);

        }
    }

    async getListsofElementsByKeyFromDB(req, res) {


        readFile(baseUrl, (err, data) => {
            if (err) {
                res.status(500).send(`Error reading from database`)
                console.error('Error reading JSON file:', err);
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
                }

            } catch (err) {
                res.status(500).send(`Error reading from database`)
                console.error('JSON data parsing error:', err);
            }

        })
    }
}

export default new databaseController