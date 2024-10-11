import styles from './css/Pagination.module.css';

const Pagination = ({ items, itemsPerPage, currentPage, setCurrentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className={styles.pagination}>
        <button 
          onClick={() => setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map(number => (
          <button 
            key={number} 
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? styles.active : ''}
          >
            {number}
          </button>
        ))}
        <button 
          onClick={() => setCurrentPage(currentPage + 1)} 
          disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    );
  };

  export default Pagination;