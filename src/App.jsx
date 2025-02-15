import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [res, setRes] = useState(""); // To store the response
  const [url, setUrl] = useState(""); // To store the URL

  // Get the current tab URL when the component mounts
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        setUrl(tabs[0].url);
      }
    });
  }, []);

  // Function to send the URL to the backend
  async function sendPredictionRequest(url) {
    if (!url) {
      alert("No URL found!");
      return;
    }

    try {
      const response = await axios.post(
        "https://6e4c-103-14-233-220.ngrok-free.app/news",
        { url }, // Send URL in request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      setRes(JSON.stringify(response.data, null, 2)); // Store response as a formatted string
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setRes("Failed to fetch response!");
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => sendPredictionRequest(url)}>
          Analyze URL
        </button>
        <p>Current URL: {url}</p>
        <pre>{res}</pre>
      </div>
    </>
  );
}

export default App;
