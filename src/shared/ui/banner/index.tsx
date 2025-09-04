type BannerProps = {
	children: string;
};

export const Banner = (props: BannerProps) => {
	return <div>{props.children}</div>;
};
