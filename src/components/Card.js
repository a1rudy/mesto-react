import React from 'react';

function Card({card, onCardClick}) {

  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="element">
      <div className="element__img-wrap">
        <img className="element__image" src={card.image} alt={card.alt} onClick={handleClick}/>
      </div>
      <button className="element__delete-button element__delete-button_active" type="button"></button>
      <div className="element__info">
        <h2 className="element__title">{card.title}</h2>
        <div className="element__like_ui">
          <button className="element__like-button" type="button"></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;