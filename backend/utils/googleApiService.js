import axios from "axios";
import config from "../config/index.js";

/**
 * Get a human-readable address from latitude and longitude.
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string>} - The formatted address.
 */
export const getAddressFromCoordinates = async (lat, lng) => {
  if (!lat || !lng) return "Location not provided";
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.google.apiKey}`;
    const { data } = await axios.get(url);
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
    return "Address not found";
  } catch (error) {
    console.error("Google Maps API Error:", error);
    return "Could not retrieve address";
  }
};

/**
 * Placeholder for translating text.
 * @param {string} text - Text to translate.
 * @param {string} targetLanguage - e.g., 'es', 'fr'
 * @returns {Promise<string>} - Translated text.
 */
export const translateText = async (text, targetLanguage = "en") => {
  console.log(`Translating "${text}" to ${targetLanguage}...`);
  return `[Translated] ${text}`;
};

/**
 * Placeholder for transcribing audio.
 * @param {string} audioUrl - Public URL of the audio file.
 * @returns {Promise<string>} - The transcribed text.
 */
export const transcribeAudio = async (audioUrl) => {
  console.log(`Transcribing audio from ${audioUrl}...`);
  return "This is a placeholder for the audio transcript.";
};
