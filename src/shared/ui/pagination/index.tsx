import styles from './styles.module.css';
import { getPagesArray } from '../../lib/pagination';

type paginationProps = {
	totalPages: number;
	page: number;
	changePage: (page: number) => void;
};

const Pagination = ({ totalPages, page, changePage }: paginationProps) => {
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
