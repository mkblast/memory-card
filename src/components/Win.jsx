import Score from "./Score";

function Win({ score, highScore }) {
  return (
    <>
      <Score score={score} highScore={highScore} />
      <p>You win</p>
    </>
  )
}

export default Win;
