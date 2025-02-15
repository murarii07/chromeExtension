import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [res, setRes] = useState(""); // To store the response
  const [url, setUrl] = useState(""); // To store the URL
  const [percent,setPercent]=useState("");
  const [flag,setFlag]=useState("")

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

      setFlag(Object.keys(response.data)[0]); // Store response as a formatted string
      let r=Object.values(response.data)[0]
      let s=parseFloat(r)*100
      setPercent(s.toFixed(2))
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setRes("Failed to fetch response!");
    }
  }

  return (
    <>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => sendPredictionRequest(url)}>
          Analyze URL
        </button>
        <pre>{flag}{percent}</pre>
      </div>
    </>
  );
}

export default App;
