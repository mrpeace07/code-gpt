import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  // Function to generate answer
  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  const containsCode = (text) => {
    // A simple regex to check for code blocks (e.g., ```code```)
    return /```.*```/s.test(text);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      {/* Light Mode Navbar */}
      <header className="bg-blue-600 w-full py-4 text-white text-center shadow-lg flex flex-col items-center px-6">
        <h1 className="text-2xl font-semibold">CodeTracker</h1>
        <p className="text-md italic">"Ask & Discover: AI-Powered Insights"</p>
      </header>

      <main className="flex-grow w-full max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10 mb-16">
        <div className="flex flex-col space-y-6">
          {/* Catchy Header */}
          <header className="text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Ask & Discover: AI-Powered Insights
            </h2>
            <p className="text-gray-600 text-sm">
              Get instant, intelligent responses to your questions. Dive into a
              world of knowledge at your fingertips!
            </p>
          </header>

          {/* Chat Bubbles */}
          <div className="flex flex-col space-y-4">
            {/* User Question */}
            {question && (
              <div className="self-start bg-blue-500 text-white p-4 rounded-lg shadow-md w-fit max-w-full break-words">
                <p className="text-sm">{question}</p>
              </div>
            )}

            {/* AI Answer */}
            {generatingAnswer ? (
              <div className="self-start bg-gray-300 text-gray-700 p-4 rounded-lg shadow-md w-fit max-w-full break-words">
                <div className="animate-pulse">AI is typing...</div>
              </div>
            ) : (
              answer && (
                <div
                  className={`self-start p-4 rounded-lg shadow-md w-fit max-w-full break-words ${
                    containsCode(answer)
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <ReactMarkdown>{answer}</ReactMarkdown>
                </div>
              )
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={generateAnswer}
            className="w-full flex items-center space-x-2"
          >
            <textarea
              required
              className="border border-gray-400 bg-white text-gray-800 rounded-lg w-full min-h-[80px] p-3 transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 resize-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
            ></textarea>
            <button
              type="submit"
              className={`bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-blue-700 ${
                generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={generatingAnswer}
            >
              {generatingAnswer ? "Generating..." : "Send"}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-100">
        <div className="flex justify-center space-x-4 text-blue-700 text-center">
          {/* Links */}
          <a
            href="https://linktr.ee/mr.peace07"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Connect with us
          </a>

          <a
            href="https://github.com/mrpeace07/code-gpt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Wish to contribute
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
