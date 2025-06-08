const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.generatePost = async (req, res) => {
  const { location, tools, time, audience, tone } = req.body;

  try {
    const prompt = `
You are a social media content creator for an environmental NGO. Generate a social media post (caption only, 1–2 short paragraphs) for a beach cleanup event happening at ${location}. The event is scheduled at ${time}, and volunteers are advised to bring: ${tools.join(', ')}.

Target audience: ${audience}. 
Tone: ${tone}.

The post should:
- Start with a hook or powerful statement
- Encourage participation
- Mention impact and community values
- Use emojis naturally (if tone allows)
- Be motivational but concise
`;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert social media writer for eco-activism." },
        { role: "user", content: prompt }
      ],
      max_tokens: 200
    });

    const caption = chatCompletion.choices[0].message.content;

    // Optional: DALL·E or Placeholder Image
    const imageUrl = "https://source.unsplash.com/featured/?beach,cleanup";

    res.json({ caption, imageUrl });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: "Failed to generate post." });
  }
};
