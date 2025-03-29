const sessionStorageUtils = {
  getData: <T>(storageName: string): T | null => {
    const res = sessionStorage.getItem(storageName);

    if (res) {
      return JSON.parse(res);
    }
    return null;
  },

  setData: <T>(storageName: string, data: T): void => {
    const existingData = sessionStorageUtils.getData(storageName);

    if (existingData && JSON.stringify(existingData) === JSON.stringify(data))
      return;

    sessionStorage.setItem(storageName, JSON.stringify(data));
  },

  removeData: (storageName: string) => {
    sessionStorage.removeItem(storageName);
  },
};

export default sessionStorageUtils;
