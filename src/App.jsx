import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

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

  return (
    <>
      {/* Header Section */}
      <header className="w-full bg-blue-500 text-white text-center p-4">
        <h2 className="text-2xl font-semibold">You can ask any doubts here!</h2>
      </header>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-3 flex flex-col justify-center items-center">
        <form
          onSubmit={generateAnswer}
          className="w-full max-w-4xl text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105"
        >
          <div className="flex items-center justify-center mb-4">
            <a
              href="https://github.com/Vishesh-Pandey/chat-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              {/* Logo next to the title */}
              <img
                src="src/assets/extension-logo.png"
                alt="Extension Logo"
                className="h-10 w-10 mr-3"
              />
              <h1 className="text-4xl font-bold text-blue-500 animate-bounce">
                Code Tracker
              </h1>
            </a>
          </div>
          <textarea
            required
            className="border border-gray-300 rounded w-full my-2 min-h-[150px] p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <button
            type="submit"
            className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ${
              generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={generatingAnswer}
          >
            Ask Any questions
          </button>
        </form>
        <div className="w-full max-w-4xl text-center rounded-lg bg-white my-4 shadow-lg p-4 transition-all duration-500 transform hover:scale-105">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      </div>

      <footer className="w-full bg-blue-500 text-white text-center p-4">
        <div className="flex justify-center space-x-4">
          {/* Link for "Connect with us" */}
          <a
            href="https://example.com/connect"  // Replace with your actual connect URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:underline"
          >
            Connect with us
          </a>

          {/* Link for "Wish to contribute" */}
          <a
            href="https://example.com/contribute" // Replace with your actual contribute URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:underline"
          >
            Wish to contribute
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
