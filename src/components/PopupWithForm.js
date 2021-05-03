function PopupWithForm({ isOpen, title, name, onClose, children }) {

  return (
    <>
      <section className={`popup popup_type_${name} ${isOpen}`} onClick={onClose}>
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form className={`popup__form popup__form_type_${name}`} name={`popup_form_${name}`} novalidate>
            {children}
            <button className="popup__save-button" type="submit"><span className="popup__button-span">Сохранить</span></button>
          </form>
          <button className="popup__close-button" type="button" onClick={onClose}></button>
        </div>
      </section>
    </>
  )
}

export default PopupWithForm;