import { useEffect, useState, useOptimistic, JSX } from 'react';
import { MyInput } from '@/shared/ui/input';
import { MyButton } from '@/shared/ui/button';
import styles from './styles.module.css';

type FormState = { email: string; name: string; city: string };

const isValidEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

async function sendForm(data: FormState) {
	await new Promise(r => setTimeout(r, 3000));
	// throw new Error("fail");
}

export function ControlledForm(): JSX.Element {
	const [form, setForm] = useState<FormState>({
		email: '',
		name: '',
		city: '',
	});
	const [emailError, setEmailError] = useState<string | null>(null);

	const [banner, setBanner] = useState<string | null>(null);

	const [optimisticBanner, showBanner] = useOptimistic<string | null, string>(
		banner,
		(_current, msg) => msg
	);

	useEffect(() => {
		if (!form.email) return setEmailError(null);
		setEmailError(isValidEmail(form.email) ? null : 'Неверный email');
	}, [form.email]);

	useEffect(() => {
		if (!banner) return;
		const t = setTimeout(() => setBanner(null), 2500);
		return () => clearTimeout(t);
	}, [banner]);

	const disableSubmit = !form.email || !!emailError;

	async function submitAction(fd: FormData) {
		const data: FormState = {
			email: String(fd.get('email') ?? form.email),
			name: String(fd.get('name') ?? form.name),
			city: String(fd.get('city') ?? form.city),
		};
		if (!data.email || emailError) return;

		showBanner('Отправка…');

		try {
			await sendForm(data);
			console.log(data);
			setBanner('Готово! Проверьте почту.');
			setForm({ email: '', name: '', city: '' });
		} catch {
			setBanner('Ошибка отправки. Попробуйте ещё раз.');
		}
	}

	return (
		<form action={submitAction} className={styles.formControlled} noValidate>
			<label>
				Email
				<MyInput
					name='email'
					type='email'
					value={form.email}
					onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
					placeholder='you@example.com'
					aria-invalid={!!emailError}
					aria-describedby={emailError ? 'email-error' : undefined}
				/>
			</label>

			{emailError && (
				<div id='email-error' role='alert'>
					{emailError}
				</div>
			)}

			<label>
				Имя
				<MyInput
					name='name'
					type='text'
					value={form.name}
					onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
					placeholder='Иван'
				/>
			</label>

			<label>
				Город
				<MyInput
					name='city'
					type='text'
					value={form.city}
					onChange={e => setForm(s => ({ ...s, city: e.target.value }))}
					placeholder='Москва'
				/>
			</label>

			<MyButton type='submit' disabled={disableSubmit}>
				Отправить
			</MyButton>

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
