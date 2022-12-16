function replacer(key: string, value: any) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
}

function reviver(key: string, value: any) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }

  return value;
}

const api = {
  gifts: () =>
    new Promise<any>((resolve, reject) => {
      try {
        const list = JSON.parse(localStorage.getItem("gifts")!, reviver);

        setTimeout(
          () =>
            resolve({
              status: "ok",
              data: list ? list : [],
            }),
          1000
        );
      } catch (error) {
        reject({
          status: "error",
          data: [],
        });
      }
    }),
  save: (data: any) =>
    new Promise((resolve, reject) => {
      try {
        localStorage.setItem("gifts", JSON.stringify(data, replacer));
        resolve("saved");
      } catch (error) {
        reject("error: impossible to save");
      }
    }),
};

export default api;
