exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const apiKey = process.env.DIFY_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "DIFY_API_KEY is missing in Netlify environment variables." }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const userMessage = body.query || body.message || "";
    const conversationId = body.conversation_id || "";
    const userId = body.user || "peshawar-student-guest";

    if (!userMessage.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Message query cannot be empty." }),
      };
    }

    const response = await fetch("https://dify.ai", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {},
        query: userMessage,
        response_mode: "blocking",
        conversation_id: conversationId,
        user: userId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.message || "Dify API error", details: data }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer: data.answer,
        conversation_id: data.conversation_id,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error connecting to Dify", details: err.message }),
    };
  }
};
