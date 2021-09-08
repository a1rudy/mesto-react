import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import DelPlacePopup from './DelPlacePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDelPlacePopupOpen, setDelPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardForDelete, setCardForDelete] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([userData, data]) => {
        setCurrentUser(userData);
        setCards(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    function handleEscClose(evt) {
      const ESC_KEYCODE = 'Escape';
      evt.key === ESC_KEYCODE && closeAllPopups();
    }

    function handleOverlayClose(evt) {
      const evtTarget = evt.target;
      if (evtTarget.classList.contains('popup')) {
        closeAllPopups();
      }
    }

    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('click', handleOverlayClose);

    return () => {
      window.removeEventListener('click', handleOverlayClose);
      window.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardDeleteRequest(card) {
    setDelPlacePopupOpen(true);
    setCardForDelete(card)
  }

  function handleCardDelete() {
    api.removeCard(cardForDelete._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== cardForDelete._id));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      }); 
  }

  function handleCardClick(item) {
    setSelectedCard(item);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDelPlacePopupOpen(false);
    setSelectedCard({});
  }

  const [isUserSending, setIsUserSending] = React.useState(false);
  function handleUpdateUser(data) {
    setIsUserSending(true);
    api.setUserProfile(data)
      .then((dataInfo) => {
        setCurrentUser(dataInfo);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsUserSending(false));
  }

  function handleUpdateAvatar(data) {
    setIsUserSending(true);
    api.setUserAvatar(data)
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsUserSending(false));
  }

  const [isCardSending, setIsCardSending] = React.useState(false);
  function handleAddPlaceSubmit(data) {
    setIsCardSending(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsCardSending(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete() {
    api.removeCard(cardForDelete._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== cardForDelete._id));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      }); 
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          
          <Header />

          <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDeleteRequest} cards={cards}/>

          <Footer />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isSending={isUserSending} /> 

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isSending={isUserSending} /> 

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isSending={isCardSending} />

          <DelPlacePopup isOpen={isDelPlacePopupOpen} onClose={closeAllPopups} onDelPlace={handleCardDelete} />

        </div>

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
