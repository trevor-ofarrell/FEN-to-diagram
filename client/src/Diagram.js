import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";

const fens = [
  "start",
  "8/p7/1p1nB1p1/3P4/1P2p3/3k1K1P/P7/8 w - - 0 50",
  "8/p7/1p1nB1p1/3P4/1P2p3/3k1K1P/P7/8 w - - 0 50",
  "start",
  "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "start",
]

const Diagram = () => {
  const [base64, setBase64] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const FEN = urlParams.get('fen').split(',');
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {

      console.log(FEN)
    fetch(`http://localhost:3009/screenshot?fen=${FEN}`)
      .then(response => response.blob())
      .then(response => {
        const reader = new FileReader();
        console.log(response.type)
        reader.readAsDataURL(response); 
        reader.onloadend = function() {
            const base64data = reader.result;                
            console.log(base64data);
            setBase64(base64data)
        }
      })
      setListening(true)
    }
  }, [base64, listening])

  return (
        <div className="bg-gray-400 h-screen w-screen m-auto">
            {!base64 ? (
                <div className="grid grid-cols-2 m-auto pt-12 h-auto" id="diagram">
                {FEN.map((fen, i) => {
                    return <div className="p-auto m-auto mb-16 h-auto">
                        <span className="text-md font-normal text-black">#{i + 1}</span>
                        <Chessboard
                            id={`${i}key`}
                            position={fen}
                            transitionDuration={100}
                            showNotation={false}
                            width={350}
                        />
                    </div>
                })}
            </div>
        ):(
            <>
                <h2 className="text-3xl text-center pt-6 mb-12">PNG image of diagram</h2>
                <div className="m-auto">
                    <img src={base64} className="m-auto border-1 border-gray-500 shadow-xl"/>
                </div>
            </>
        )}
    </div>
  );
}

export default Diagram;