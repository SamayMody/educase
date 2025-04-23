import { connection } from "../middlewares/database";

export const registerSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        const connect = await connection().getConnection();
        const data = await connect.query('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]);

        return res.status(201).json({ "message": "School registered!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Internal server error" });
    }
};

export const listNearbySchools = async (req, res) => {
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLng = parseFloat(req.query.longitude);

        if (!(userLat) || !(userLng)) {
            return res.status(400).json({ error: "Latitude and longitude are required and must be valid numbers" });
        }

        const connect = await connection()

        const [schools] = await connect.query(
            `SELECT id, name, address, latitude, longitude,
          (
            6371 * ACOS(
              COS(RADIANS(?)) *
              COS(RADIANS(latitude)) *
              COS(RADIANS(longitude) - RADIANS(?)) +
              SIN(RADIANS(?)) *
              SIN(RADIANS(latitude))
            )
          ) AS distance
        FROM schools
        WHERE latitude IS NOT NULL AND longitude IS NOT NULL
        HAVING distance <= 5
        ORDER BY distance ASC`,
            [userLat, userLng, userLat]
        );

        return res.status(200).json({
            message: "Schools within 5 km radius",
            schools
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
