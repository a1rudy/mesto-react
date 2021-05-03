function ImagePopup({card, onClose}) {
  return (

    <section className={`popup popup_style_opacity popup_type_mesto ${card ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__wrap">
        <figure className="popup__figure">
          <img src={card.image} alt={card.alt} className="popup__image" />
          <figcaption className="popup__caption">{card.title}</figcaption>
        </figure>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default ImagePopup;