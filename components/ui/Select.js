import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";

const Select = (props) => {
  const [title, setTitle] = useState(props.title);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const menuRef = useRef(null);

  const onSelect = (e) => {
    setIsOpen(false);
    setTitle(e);
    props.onSelectHandler(e);
  };

  const eventCallback = (event) => {
    if (menuRef?.current?.contains(event.target)) return;
    setIsOpen(false);
  };

  const clickListener = (isListening, menuRef) => {
    if (isListening) return;
    if (!menuRef?.current) return;
    setIsListening(true);
    ["click", "touchstart"].forEach((type) => {
      document.addEventListener(type, eventCallback);
    });
  };

  useEffect(() => {
    if (props.default) onSelect(props.default);

    clickListener(isListening, menuRef);

    return () => {
      ["click", "touchstart"].forEach((type) => {
        document.removeEventListener(type, eventCallback);
      });
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="dropdown"
      style={{ padding: "10px", width: "fit-content" }}
    >
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {title}
        <span className="caret" />
      </button>
      <ul
        className="dropdown-menu"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {props.options.map((e) => (
          <li className="dropdown-item" onClick={() => onSelect(e)} key={e}>
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
