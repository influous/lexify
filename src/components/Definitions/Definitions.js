import React from "react";
import "./Definitions.css";

const Definitions = ({ word, category, meanings, lightMode }) => {
  return (
    <div className="meanings">
      {meanings[0] && word && category === "en" && (
        <audio
          src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
          style={{ borderRadius: 10 }}
          controls
        >
          Your browser does not support audio content.
        </audio>
      )}

      {word === "" ? (
        <span
          className="subTitle"
          style={{ color: lightMode ? "#000" : "darkgray" }}
        >
          Start by typing a word.
        </span>
      ) : (
        meanings.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              <div
                className="singleMean"
                style={{
                  backgroundColor: lightMode ? "#ebebeb" : "#3d3d3d",
                  color: lightMode ? "#000" : "#fff",
                }}
              >
                <span>
                  <b>Definition: </b>
                  {def.definition.charAt(0).toUpperCase() +
                    def.definition.slice(1, -1)}
                </span>
                {def.example === undefined ? (
                  <div class="singleEntry"></div>
                ) : (
                  def.example && (
                    <span>
                      <div class="singleEntry">
                        <b>Example: </b>
                        {def.example.charAt(0).toUpperCase() +
                          def.example.slice(1)}
                      </div>
                    </span>
                  )
                )}
                {def.synonyms && (
                  <span>
                    <b>Synonyms: </b>
                    {def.synonyms.length === 0
                      ? "(None)"
                      : def.synonyms.map((s) => `${s}, `)}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
};

export default Definitions;
