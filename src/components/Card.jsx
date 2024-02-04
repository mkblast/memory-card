function Card({ name, sprite }) {
  return (
    <>
      <img src={sprite} />
      <p>{name}</p>
    </>
  )
}

export default Card;
