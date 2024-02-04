function Difficulty({handleClick}) {
  return (
    <div>
      <button onClick={() => handleClick(5)}>Easy</button>
      <button onClick={() => handleClick(10)}>Normal</button>
      <button onClick={() => handleClick(15)}>Hard</button>
    </div>
  )
}

export default Difficulty;
