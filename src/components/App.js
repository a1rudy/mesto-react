import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupImage from './PopupImage';


function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(item) {
    setSelectedCard(item);
  }
  console.log(selectedCard)
  
  function closeAllPopups(e, setter) {
    if (e.target === e.currentTarget) {
      setter(false);
    }
  }

  return (
    <div className="body">
      <div className="page">
        
        <Header />

        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={item => handleCardClick(item)}/>
        <Footer />

        <PopupImage card={selectedCard} onClose={e => closeAllPopups(e, setSelectedCard)} />

        <PopupWithForm  isOpen={isEditAvatarPopupOpen ? 'popup_opened' : ''} title={'Обновить аватар'} name={'avatar'} onClose={e => closeAllPopups(e, setEditAvatarPopupOpen)}>
          <div className="popup__form-wrap popup__form-wrap_type_avatar">
            <input className="popup__input" id="input-link" type="url" placeholder="Ссылка на аватарку" name="avatar" required />
            <span className="popup__input-error input-link-error"></span>
          </div>
        </PopupWithForm>

        <PopupWithForm isOpen={isEditProfilePopupOpen ? 'popup_opened' : ''} title={'Редактировать профиль'} name={'profile'} onClose={e => closeAllPopups(e, setEditProfilePopupOpen)}>
          <div className="popup__form-wrap">
            <input className="popup__input popup__input_type_top" id="name-input" type="text" placeholder="Имя" name="name" minlength="2" maxlength="40" required />
            <span className="popup__input-error name-input-error"></span>
          </div>
          <div className="popup__form-wrap">
            <input className="popup__input popup__input_type_bottom" id="about-input" type="text" placeholder="О себе" name="about" minlength="2" maxlength="200" required />
            <span className="popup__input-error about-input-error"></span>
          </div>
        </PopupWithForm>

        <PopupWithForm isOpen={isAddPlacePopupOpen ? 'popup_opened' : ''} title={'Новое место'} name={'mesto'} onClose={e => closeAllPopups(e, setAddPlacePopupOpen)}>
          <div className="popup__form-wrap">
            <input className="popup__input popup__input_type_top" id="title-input" type="text" placeholder="Название" name="name" minlength="2" maxlength="30" required />
            <span className="popup__input-error title-input-error"></span>
          </div>
          <div className="popup__form-wrap">
            <input className="popup__input popup__input_type_bottom" id="link-input" type="url" placeholder="Ссылка на картинку" name="link" required />
            <span className="popup__input-error link-input-error"></span>
          </div>
        </PopupWithForm>

      </div>

    </div>
  )
}

export default App;
