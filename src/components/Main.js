import React from 'react';
import Card from '../components/Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CardsContext } from '../contexts/CardsContext'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  return (
    <div className="content">
      <section className="profile">
        <div className="profile__avatar-wrap">
          <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
          <img className="profile__avatar" src={currentUser.avatar} alt="Подождите, подгружается" />
        </div>
        <div className="profile__info">
          <button className="profile__edit-button" onClick={onEditProfile} type="button"></button>
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} type="button"></button>
      </section>
        
      <section className="elements">
        {cards.map((item) => (<Card key={item.id} card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
      </section>
    </div>
  );
}

export default Main;
