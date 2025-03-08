const localStorageUtils = {
  getData: (stor: string): string | null => {
    return localStorage.getItem(stor);
  },

  setData: (stor: string, data: string) => {
    if (localStorageUtils.getData(stor) === data) return;
    localStorage.setItem(stor, data);
  },

  removeData: (stor: string) => {
    localStorage.removeItem(stor);
  },
};

// getData: <T>(stor: string): T | null => {
//   const data = localStorage.getItem(stor);
//   return data ? (JSON.parse(data) as T) : null;
// },
//   setData: (stor: string, data: string) => {
//     const jsonData = typeof data === "string" ? data : JSON.stringify(data);
//     if (JSON.stringify(localStorageUtils.getData(stor)) === jsonData) return;
//     localStorage.setItem(stor, jsonData);
//   },
// };

export default localStorageUtils;
