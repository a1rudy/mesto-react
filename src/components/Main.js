import React from 'react';
import {api} from '../utils/api'
import Card from '../components/Card'

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

  const [userName, setUserName] = React.useState('');
  const [userAbout , setUserAbout] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.setUserProfile(), api.getInitialCards()])
      .then(([userData, data]) => {
        setUserName(userData.name);
        setUserAbout(userData.about);
        setUserAvatar(userData.avatar);

        setCards(data.map(item => ({
          title: item.name,
          image: item.link,
          alt: item.name,
          likes: item.likes,
          id: item._id,
        })));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <div className="content">
      <section className="profile">
        <div className="profile__avatar-wrap">
          <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
          <img
            src={userAvatar}
            alt="Подождите, подгружается"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <button className="profile__edit-button" onClick={onEditProfile} type="button"></button>
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__about">{userAbout}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} type="button"></button>
      </section>
        
      <section className="elements">
        {cards.map((item) => (<Card key={item.id} card={item} onCardClick={onCardClick}/>))}
      </section>
    </div>
  );
}

export default Main;
