class CacheProvider {
  static async fetchData(key, expiryInMinutes = 60, callback) {
    try {
      const cachedItem = localStorage.getItem(key)
      if (cachedItem) {
        const parsedItem = JSON.parse(cachedItem)
        const isExpired = new Date().getTime() > parsedItem.expiry
        if (!isExpired) {
          return parsedItem.data
        } else {
          localStorage.removeItem(key)
        }
      }

      const response = await callback()
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const result = await response.json()

      // CacheProvider the data with expiry
      const expiry = new Date().getTime() + expiryInMinutes * 60 * 1000 // Calculate expiry time
      localStorage.setItem(key, JSON.stringify({ data: result, expiry }))

      return result
    } catch (err) {
      console.log(err)
    }
  }
}

export default CacheProvider

