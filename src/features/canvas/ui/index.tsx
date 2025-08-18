import { useRef, useEffect, useState } from 'react';
import styles from './style.module.css';
import MyButton from '@/shared/ui/button';

type Props = {
	width?: number;
	height?: number;
};

export default function Canvas({ width = 600, height = 400 }: Props) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		const context = contextRef.current;
		if (!context) return;
		context.lineWidth = 2;
		context.lineCap = 'round';
		context.strokeStyle = 'red';
	}, []);

	const startDrawing = (e: React.MouseEvent) => {
		const context = contextRef.current;
		context?.beginPath();
		context?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
		setIsDrawing(true);
	};

	const draw = (e: React.MouseEvent) => {
		if (!isDrawing) return;

		const context = contextRef.current;

		context?.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
		context?.stroke();
	};

	const stopDrawing = () => {
		setIsDrawing(false);
	};

	const clearCanvas = () => {
		const context = contextRef.current;
		context?.clearRect(0, 0, width, height);
	};

	return (
		<>
			<canvas
				className={styles.canvas}
				ref={canvasRef}
				width={width}
				height={height}
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={stopDrawing}
				onMouseLeave={stopDrawing}
			>
				Ваш браузер не поддерживает canvas
			</canvas>
			<MyButton onClick={clearCanvas}>Очистить холст</MyButton>
		</>
	);
}
