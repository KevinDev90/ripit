import Constants from "expo-constants";

const config = Constants.expoConfig.extra;

export const apiKey = config.API_KEY_OPENAI;
export const urlCompetitions = "https://api.openai.com/v1/completions";
export const urlChat = "https://api.openai.com/v1/chat/completions";
export const urlImages = "https://api.openai.com/v1/images/generations";
