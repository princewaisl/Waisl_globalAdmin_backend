const Location = require('../models/Location');

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({
      attributes: ['id', 'location']
    });
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
