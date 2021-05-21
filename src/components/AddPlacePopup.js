import React from 'react';
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ isOpen, onClose, handleClickClose, onAddPlace }) {
  
  const [namePlace, setNamePlace] = React.useState('');
  const [linkPlace, setlinkPlace] = React.useState('');

  function handleChangeNamePlace(evt) {
    setNamePlace(evt.target.value);
  }

  function handleChangeLinkPlace(evt) {
    setlinkPlace(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: namePlace,
      link: linkPlace,
    });
  }
  
  return (
    <PopupWithForm isOpen={isOpen} title={'Новое место'} name={'mesto'} buttonText={'Создать'} handleClickClose={handleClickClose} onSubmit={handleSubmit} onClose={onClose}>
      <div className="popup__form-wrap">
        <input className="popup__input popup__input_type_top" onChange={handleChangeNamePlace}  id="title-input" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
        <span className="popup__input-error title-input-error"></span>
      </div>
      <div className="popup__form-wrap">
        <input className="popup__input popup__input_type_bottom" onChange={handleChangeLinkPlace} id="link-input" type="url" placeholder="Ссылка на картинку" name="link" required />
        <span className="popup__input-error link-input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;