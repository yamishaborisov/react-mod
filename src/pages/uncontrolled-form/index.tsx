import { useId, useOptimistic, useRef, useState, JSX, useEffect } from 'react';
import { MyInput } from '@/shared/ui/input';
import { MyButton } from '@/shared/ui/button';
import styles from './styles.module.css';

type FormState = { email: string; name: string; city: string };

async function sendForm(data: FormState) {
	await new Promise(r => setTimeout(r, 3000));
	console.log('submit:', data);
}

export function UncontrolledForm(): JSX.Element {
	const formRef = useRef<HTMLFormElement>(null);

	const [banner, setBanner] = useState<string | null>(null);

	const [optimisticBanner, showBanner] = useOptimistic<string | null, string>(
		banner,
		(_, msg) => msg
	);

	useEffect(() => {
		if (!banner) return;
		const t = setTimeout(() => setBanner(null), 2500);
		return () => clearTimeout(t);
	}, [banner]);

	const emailId = useId();
	const nameId = useId();
	const cityId = useId();

	async function submitAction(fd: FormData) {
		const data: FormState = {
			email: String(fd.get('email') ?? ''),
			name: String(fd.get('name') ?? ''),
			city: String(fd.get('city') ?? ''),
		};

		showBanner('Отправка…');

		try {
			await sendForm(data);
			setBanner('Готово! Проверьте почту.');
			formRef.current?.reset();
		} catch {
			setBanner('Ошибка отправки. Попробуйте ещё раз.');
		}
	}

	return (
		<form
			ref={formRef}
			action={submitAction}
			className={styles.formUncontrolled}
		>
			<div>
				<label htmlFor={emailId}>Email</label>
				<MyInput
					id={emailId}
					name='email'
					type='email'
					placeholder='you@example.com'
					required
					defaultValue=''
					autoComplete='email'
				/>
			</div>
			<div>
				<label htmlFor={nameId}>Имя</label>
				<MyInput
					id={nameId}
					name='name'
					type='text'
					placeholder='Иван'
					required
					minLength={2}
					defaultValue=''
					autoComplete='name'
				/>
			</div>
			<div>
				<label htmlFor={cityId}>Город</label>
				<MyInput
					id={cityId}
					name='city'
					type='text'
					placeholder='Москва'
					defaultValue=''
					autoComplete='address-level2'
				/>
			</div>

			<MyButton type='submit'>Отправить</MyButton>

			{optimisticBanner && (
				<div
					role={optimisticBanner.startsWith('Ошибка') ? 'alert' : 'status'}
					className={styles.banner}
				>
					{optimisticBanner}
				</div>
			)}
		</form>
	);
}
