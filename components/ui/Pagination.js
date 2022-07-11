import styles from "./Pagination.module.css";

const Pagination = (props) => {
  const mapPages = () => {
    let pageButtons = [];
    for (let i = 1; i <= props.pages; i++) {
      pageButtons.push(
        <button
          type="button"
          className={`btn btn-link ${
            props.currentPage === i - 1 && styles.current
          }`}
          onClick={props.setCurrentPage.bind(null, i - 1)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`btn ${props.currentPage === 0 && "disabled"}`}
        onClick={props.setCurrentPage.bind(null, props.currentPage - 1)}
      >
        <i className="bi-caret-left-square" />
      </button>
      {mapPages()}
      <button
        type="button"
        className={`btn ${props.currentPage === props.pages - 1 && "disabled"}`}
        onClick={props.setCurrentPage.bind(null, props.currentPage + 1)}
      >
        <i className="bi-caret-right-square" />
      </button>
    </div>
  );
};

export default Pagination;
