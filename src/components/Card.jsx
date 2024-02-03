function Card({ name, sprite }) {
  return (
    <div className="card">
      <img src={sprite} />
      <p>{name}</p>
    </div>
  )
}

export default Card;
