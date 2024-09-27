const connection = require('../config/db');

const ContentModel = {
    getPageHome: (callBack) => {
        const query = `
        SELECT block.block_id, block.url_image, block.alt_image, page_home.title 
        FROM block 
        JOIN page_home 
        ON block.page_id = page_home.page_home_id 
        `;
        connection.query(query, (err, result) => {
            if (err) {
                return callBack(err)
            } else {
                return callBack(null, result)
            }
        })
    },
    getPageAbout: (callBack) => {
        const query = 'SELECT * FROM page_about';
        connection.query(query, (err, result) => {
            if (err) {
                return callBack(err)
            } else {
                return callBack(null, result)
            }
        })
    },
    getPageContact: (callBack) => {
        const query = 'SELECT * FROM page_contact';
        connection.query(query, (err, result) => {
            if (err) {
                return callBack(err)
            } else {
                return callBack(null, result)
            }
        })
    },
    postPageAbout: (title, text, callback) => {
        const query = 'UPDATE page_about SET title = ?, text = ? WHERE page_about_id = 1'
        connection.query(query, [title, text], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    postPageContact: (addressCity, addressCountry, addressRegion, addressStreet, email, tell, title, viber, callback) => {
        const query = 'UPDATE page_contact SET title = ?, email = ?, viber = ?, tell = ?, address_country = ?, address_region = ?, address_city = ?, address_street = ? WHERE page_contact_id = 1'
        connection.query(query, [title, email, viber, tell, addressCountry, addressRegion, addressCity, addressStreet], (err, result) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, result)
            }
        })
    },
    postPageHome: (dataArray, title, callback) => {
        const query = 'UPDATE page_home SET title = ? WHERE  page_home_id = 1'
        const parsedDataArray = JSON.parse(dataArray)

        connection.query(query, [title], (err, result) => {
            if (err) {
                return callback(err)
            }
            const updatePromises = parsedDataArray.map((data, index) => {
                const queryBlock = 'UPDATE block SET url_image = ?, alt_image = ? WHERE block_id = ?';
                return new Promise((resolve, reject) => {
                    connection.query(queryBlock, [data.url, data.alt, index + 1], (err, result) => {
                        if (err) {
                            return reject(err)
                        }
                        resolve(result)
                    })
                })
            })

            Promise.all(updatePromises)
                .then(() => callback(null, result))
                .catch(err => callback(err))
        })
    },
    postChangeBlock: (idBlock, methodChange, url, alt, callback) => {
        if (methodChange === 'add') {
            const queryAdd = 'INSERT INTO block (url_image, alt_image) VALUES (?, ?)';
            connection.query(queryAdd, [url, alt], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null, result)
                }
            })
        }
        if (methodChange === 'del') {
            const queryDel = 'DELETE FROM block WHERE block_id = ?;'
            connection.query(queryDel, [idBlock], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null, result)
                }
            })
        }
    }
};

module.exports = ContentModel
