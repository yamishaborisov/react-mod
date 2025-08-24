type option = {
	value: string | number;
	name: string | number;
};

type mySelectProps = {
	options: option[];
	defaultValue: string;
	value: string | number;
	onChange: (value: string) => void;
};
type onChangeProps = {
	value: string;
	onChange: (value: string) => void;
};

export const MySelect = ({
	options,
	defaultValue,
	value,
	onChange,
}: mySelectProps) => {
	return (
		<select
			value={value}
			onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
				onChange(event.target.value)
			}
		>
			<option disabled value=''>
				{defaultValue}
			</option>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
};
