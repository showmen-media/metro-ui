import styles from './styles.module.scss';

export default function LoadingSpinner({ label }: LoadingProps) {
	return (
		<div className={styles.loader}>
			<div>{label || "Loading"}</div>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
}

type LoadingProps = {
	label?: string;
};
