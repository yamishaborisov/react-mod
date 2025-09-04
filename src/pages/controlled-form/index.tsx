import { useEffect, useState, useOptimistic, JSX } from 'react';
import { MyInput, MyButton, Banner } from '@/shared/ui';
import { isValidEmail, isValidName } from '@/shared/lib/validation';
import styles from './styles.module.css';
import { sendForm, fdGetStr } from '@/shared/lib/utils';
import type { SendFormPayload } from '@/shared/types';

type FormState = { email: string; name: string; city: string };

export function ControlledForm(): JSX.Element {
	const [form, setForm] = useState<FormState>({
		email: '',
		name: '',
		city: '',
	});
	const [emailError, setEmailError] = useState<string | null>(null);
	const [nameError, setNameError] = useState<string | null>(null);

	const [banner, setBanner] = useState<string | null>(null);

	const [optimisticBanner, showBanner] = useOptimistic<string | null, string>(
		banner,
		(_current, msg) => msg
	);

	useEffect(() => {
		if (!banner) return;
		const t = setTimeout(() => setBanner(null), 2500);
		return () => clearTimeout(t);
	}, [banner]);

	async function submitAction() {
		const { email, name, city } = form;

		const emailError: string | null = !email
			? 'Введите email'
			: isValidEmail(email)
			? null
			: 'Неверный email';

		setEmailError(emailError);
		if (emailError) return;

		const nameError: string | null = !name
			? 'Введите имя'
			: isValidName(name)
			? null
			: 'Неверное имя';
		setNameError(nameError);
		if (nameError) return;

		const checkedCity: string | undefined = fdGetStr(city);

		showBanner('Отправка…');

		try {
			const payload: SendFormPayload = {
				email,
				name,
				...(checkedCity !== undefined && { city: checkedCity }),
			};
			await sendForm(payload);
			console.log(payload);
			setBanner('Готово! Проверьте почту.');
			setForm({ email: '', name: '', city: '' });
			setEmailError(null);
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

			{emailError && <div id='email-error'>{emailError}</div>}

			<label>
				Имя
				<MyInput
					name='name'
					type='text'
					value={form.name}
					onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
					placeholder='Иван'
					aria-invalid={!!nameError}
					aria-describedby={nameError ? 'name-error' : undefined}
				/>
			</label>
			{nameError && <div id='name-error'>{nameError}</div>}

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

			<MyButton type='submit'>Отправить</MyButton>

			{optimisticBanner && <Banner>{optimisticBanner}</Banner>}
		</form>
	);
}
