const randomGifts: string[] = [
  "Fernet",
  "Notebook",
  "Aire acondicionado",
  "Medias",
  "Auriculares",
  "Ventilador Liliana",
  "Pelopincho",
  "1kg de yerba",
  "Vino",
  "Camisa",
  "Vestido",
  "Paltas",
];

const getRandomGift = () => {
  return randomGifts[Math.floor(Math.random() * randomGifts.length)];
};

const api = {
  randomGift: async (): Promise<string> => {
    return getRandomGift();
  },
};

try {
  const randomGift = api.randomGift();

  randomGift.then((e) => console.log(e));
} catch (error) {
  console.log(error);
}

export default api;
