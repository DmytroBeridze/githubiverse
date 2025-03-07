const localStorageUtils = {
  getData: <T>(stor: string): T | null => {
    const data = localStorage.getItem(stor);
    return data ? (JSON.parse(data) as T) : null;
  },

  setData: (stor: string, data: string) => {
    const jsonData = JSON.stringify(data);
    if (JSON.stringify(localStorageUtils.getData(stor)) === jsonData) return;
    localStorage.setItem(stor, jsonData);
  },
};

export default localStorageUtils;
