import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, FormGroup, Switch, withStyles } from "@material-ui/core";
import Header from "./components/Header/Header";
import Definitions from "./components/Definitions/Definitions";
import { grey } from "@material-ui/core/colors";

function App() {
  // state, setState
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [LightMode, setLightMode] = useState(false);

  const DarkMode = withStyles({
    switchBase: {
      color: grey[500],
      "&$checked": {
        color: grey[300],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  useEffect(() => {
    const dictionaryApi = async () => {
      try {
        const data = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        );
        setMeanings(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dictionaryApi();
  }, [word, category]); // Provide it word & category everytime

  return (
    <div className="App">
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: LightMode ? "#fff" : "#292929",
          color: LightMode ? "black" : "white",
          transition: "all 0.2s linear",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <FormGroup
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>
            {/* {LightMode ? 'Dark' : 'Light'} */}
            Light Mode
            <DarkMode
              checked={LightMode}
              onChange={() => setLightMode(!LightMode)}
            />
          </span>
        </FormGroup>

        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          setMeanings={setMeanings}
          lightMode={LightMode}
        />
        {meanings && (
          <Definitions
            word={word}
            meanings={meanings}
            category={category}
            lightMode={LightMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;