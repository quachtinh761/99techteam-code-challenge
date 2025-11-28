import Hotel from "./Hotel";
import Room from "./Room";

// Define associations
Hotel.hasMany(Room, {
  foreignKey: "hotel_id",
  as: "rooms",
});

Room.belongsTo(Hotel, {
  foreignKey: "hotel_id",
  as: "hotel",
});

export { Hotel, Room };
