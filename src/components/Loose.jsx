import Score from "./Score";

function Loose({ score, highScore }) {
  return (
    <>
      <Score score={score} highScore={highScore} />
      <p>You loose</p>
    </>
  )
}

export default Loose;
