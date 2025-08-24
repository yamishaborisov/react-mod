import { MyInput } from '@/shared/ui/input';
import { MySelect } from '@/shared/ui/select';

type SortField = 'title' | 'body' | '';
type Filter = {
	query: string;
	sort: SortField;
};

type PostFilterProps = {
	filter: Filter;
	setFilter: (filter: Filter) => void;
};

export const PostFilter = ({ filter, setFilter }: PostFilterProps) => {
	return (
		<div>
			<MyInput
				placeholder='Поиск...'
				value={filter.query}
				onChange={e => setFilter({ ...filter, query: e.target.value })}
			/>
			<MySelect
				value={filter.sort}
				onChange={selectedSort =>
					setFilter({ ...filter, sort: selectedSort as SortField })
				}
				defaultValue='Сортировка'
				options={[
					{ value: 'title', name: 'По названию' },
					{ value: 'body', name: 'По описанию' },
				]}
			/>
		</div>
	);
};
