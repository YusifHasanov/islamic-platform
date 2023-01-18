
async function getData(dataType) {
    try {
        const data = await dataType.find();

        return data;
    } catch (error) {
        console.log(error);
    }
}

async function addData(dataType, paramsData) {
    try {
        const data = new dataType(paramsData);
        await data.save();
    } catch (error) {
        console.log(error);
    }
}

async function updateData(dataDype, paramsData) {
    try {
        const updatedData = await dataDype.findOneAndUpdate({ id: paramsData.id }, paramsData
            , { new: true });
        return updatedData;
    } catch (error) {
        console.log(error);
    }
}
async function deleteData(dataType, id) {
    try {
        await dataType.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error);
    }
}

async function getById(dataType, id) {
    try {
        const data = await dataType.findOne({ _id: id });
        return data;
    } catch (error) {
        console.log(error);

    }
}



module.exports = {
    getData,
    addData,
    updateData,
    deleteData,
    getById
}