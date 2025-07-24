import styles from './pagination.module.css';
import { getPagesArray } from '@shared-pagination/pages';

const Pagination = ({ totalPages, page, changePage }) => {
	let pagesArray = getPagesArray(totalPages);
	return (
		<div className={styles.page_wrapper}>
			{pagesArray.map(p => (
				<span
					onClick={() => changePage(p)}
					key={p}
					className={
						page === p ? `${styles.page} ${styles.page_current}` : styles.page
					}
				>
					{p}
				</span>
			))}
		</div>
	);
};

export default Pagination;
