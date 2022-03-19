
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        // const criteria = {}
        const collection = await dbService.getCollection('toy')
        const sortCriteria = _buildSortCriteria(filterBy)
        var toys = await collection.find(criteria).sort(sortCriteria).collation({ locale: "en", caseLevel: true }).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        const toyId = await collection.insertOne(toy)
        const addedToy = await collection.findOne({ '_id': ObjectId(toyId.insertedId) })
        return addedToy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ "_id": id }, { $set: { ...toy } })
        console.log('updated');
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name, $options: 'i' }
        criteria.name = txtCriteria
    }
    if (filterBy.inStock) {
        criteria.inStock = JSON.parse(filterBy.inStock)
    } if (filterBy.labels) {
        criteria.labels = { $in: filterBy.labels }
    }
    return criteria
}

function _buildSortCriteria({ sortBy }) {
    const criteria = {}
    criteria[sortBy] = 1
    return criteria

}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}