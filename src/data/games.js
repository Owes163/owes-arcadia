// Auto import all png images
const images = import.meta.glob("../assets/*.png", {
  eager: true,
  import: "default",
});

// Sort properly (game1, game2 ... game50)
const imageArray = Object.entries(images)
  .sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true })
  )
  .map(([, value]) => value);

// 🔥 EDIT ONLY THIS SECTION (name + price)
const gameData = [
  { name: "Forza Horizon 5", price: 1499 },
  { name: "Grand Theft Auto V", price: 1299 },
  { name: "Red Dead Redemption 2", price: 1599 },
  { name: "Spider-Man Remastered", price: 1399 },
  { name: "Spider-Man 2", price: 1699 },
  { name: "Tomb Raider", price: 999 },
  { name: "Rise of the Tomb Raider", price: 1199 },
  { name: "Shadow of the Tomb Raider", price: 1299 },
  { name: "God of War", price: 1499 },
  { name: "God of War Ragnarok", price: 1799 },
  { name: "Cyberpunk 2077", price: 1199 },
  { name: "Need for Speed", price: 999 },
  { name: "Need for Speed Rivals", price: 1099 },
  { name: "Need for Speed Unbound", price: 1499 },
  { name: "Need for Speed Heat", price: 999 },
  { name: "GTA Trilogy", price: 1999 },
  { name: "Assassin’s Creed Odyssey", price: 1299 },
  { name: "Assassin’s Creed Origins", price: 1099 },
  { name: "Assassin’s Creed Valhalla", price: 1499 },
  { name: "Assassin’s Creed Black Flag", price: 999 },
  { name: "Assassin’s Creed Unity", price: 999 },
  { name: "Assassin’s Creed Shadows", price: 1699 },
  { name: "Assassin’s Creed Mirage", price: 1399 },
  { name: "Max Payne 3", price: 799 },
  { name: "Max Payne 2", price: 699 },
  { name: "Far Cry 3", price: 799 },
  { name: "Far Cry 4", price: 899 },
  { name: "Far Cry 5", price: 999 },
  { name: "Far Cry 6", price: 1299 },
  { name: "Watch Dogs", price: 899 },
  { name: "Watch Dogs 2", price: 999 },
  { name: "Watch Dogs Legion", price: 1199 },
  { name: "Saints Row", price: 999 },
  { name: "Saints Row Reboot", price: 1299 },
  { name: "Mafia", price: 899 },
  { name: "Mafia II", price: 999 },
  { name: "Mafia III", price: 1099 },
  { name: "Ghost of Tsushima", price: 1599 },
  { name: "Uncharted 4", price: 1399 },
  { name: "Prince of Persia", price: 899 },
  { name: "Halo Infinite", price: 1499 },
  { name: "Horizon Zero Dawn", price: 1199 },
  { name: "Horizon Forbidden West", price: 1799 },
  { name: "Minecraft", price: 999 },
  { name: "Chicken Invaders", price: 499 },
  { name: "WWE 2K23", price: 1999 },
  { name: "WWE 2K17", price: 1299 },
  { name: "Split Fiction", price: 899 },
];

const games = imageArray.map((img, index) => ({
  id: index + 1,
  name: gameData[index]?.name || `Game ${index + 1}`,
  price: gameData[index]?.price ?? 999,
  image: img,
}));

export default games;