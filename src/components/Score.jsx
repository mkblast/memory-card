import "../styles/score.css"

function Score({score, highScore}) {
  return(
    <div className="score">
      <p>Score: {score}</p>
      <p>/</p>
      <p>High Score: {highScore}</p>
    </div>
  )
}

export default Score;
