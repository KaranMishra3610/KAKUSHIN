exports.generatePost = async (req, res) => {
  const { tone, targetAudience, description } = req.body;

  // For real-world: Use OpenAI here to generate image + caption
  const caption = `🌊 Cleanup Drive: ${description} — Let's save the planet, ${targetAudience}! [Tone: ${tone}]`;
  const imageUrl = "https://via.placeholder.com/600x300.png?text=Beach+Cleanup";

  res.json({ caption, imageUrl });
};
