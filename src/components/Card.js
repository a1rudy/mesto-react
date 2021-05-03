function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="element">
      <div className="element__img-wrap">
        <img className="element__image" src={props.card.image} alt={props.card.alt} onClick={handleClick}/>
      </div>
      <button className="element__delete-button" type="button"></button>
      <div className="element__info">
        <h2 className="element__title">{props.card.title}</h2>
        <div className="element__like_ui">
          <button className="element__like-button" type="button"></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;