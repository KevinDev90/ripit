import {
  apiKey,
  urlChat,
  urlCompetitions,
  urlImages,
} from "@services/openIAapi";

export const fetchCreateImages = async (prompt) => {
  const response = await fetch(urlImages, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      n: 2,
      size: "1024x1024",
    }),
  });

  const data = await response.json();

  return data.data[0].url;
};

export const fetchPostMessage = async (text) => {
  const response = await fetch(urlChat, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
      temperature: 0.5,
      // max_tokens: 100,
    }),
  });
  const data = await response.json();

  return data.choices[0].message.content;
};

export const fetchPostText = async (prompt) => {
  const response = await fetch(urlCompetitions, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
      temperature: 0,
    }),
  });
  const data = await response.json();

  return data.choices[0].text.trim();
};
