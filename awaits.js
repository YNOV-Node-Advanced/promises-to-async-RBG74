async function superCompress(input) {
    let result;
    try {
        result = await readFromCache(input);
        cleanCacheMetadata(result);
    } catch (error) {
        if (error.code != "NoCache") {
            throw error;
        }
        result = await readFromFile(input);
        await storeInCache(input, result);
    }
    return compress(result);
}
