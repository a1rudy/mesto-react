import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(item) {
    setSelectedCard(item);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleOverlayClose(evt) {
    const evtTarget = evt.target;
    if (evtTarget.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  return (
    <div className="body">
      <div className="page">
        
        <Header />

        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>
        <Footer />

        <ImagePopup card={selectedCard} handleClickClose={handleOverlayClose} onClose={closeAllPopups} />

        <PopupWithForm  isOpen={isEditAvatarPopupOpen} title={'Обновить аватар'} name={'avatar'} buttonText={'Сохранить'} handleClickClose={handleOverlayClose} onClose={closeAllPopups}>
          <div className="popup__form-wrap popup__form-wrap_type_avatar">
            <input className="popup__input" id="input-link" type="url" placeholder="Ссылка на аватарку" name="avatar" required />
            <span className="popup__input-error input-link-error"></span>
          </div>
        </PopupWithForm>

        <PopupWithForm isOpen={isEditProfilePopupOpen} title={'Редактировать профиль'} name={'profile'} buttonText={'Сохранить'} handleClickClose={handleOverlayClose} onClose={closeAllPopups}>
          <div className="popup__form-wrap">
            <input className="popup__input popup__input_type_top" id="name-input" type="text" placeholder="Имя" name="name" minLength="2" maxLength="40" required />
            <span className="popup__input-error name-input-error"></span>
          </div>
          <div className="popup__form-wrap">
            <input className="popup__input popup__input_type_bottom" id="about-input" type="text" placeholder="О себе" name="about" minLength="2" maxLength="200" required />
            <span className="popup__input-error about-input-error"></span>
          </div>
        </PopupWithForm>

        <PopupWithForm isOpen={isAddPlacePopupOpen} title={'Новое место'} name={'mesto'} buttonText={'Создать'} handleClickClose={handleOverlayClose} onClose={closeAllPopups}>
          <div className="popup__form-wrap">
            <input className="popup__input popup__input_type_top" id="title-input" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
            <span className="popup__input-error title-input-error"></span>
          </div>
          <div className="popup__form-wrap">
            <input className="popup__input popup__input_type_bottom" id="link-input" type="url" placeholder="Ссылка на картинку" name="link" required />
            <span className="popup__input-error link-input-error"></span>
          </div>
        </PopupWithForm>

        <PopupWithForm title={'Вы уверены?'} name="delete" buttonText={'Да'}/>

      </div>

    </div>
  )
}

export default App;
