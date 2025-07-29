import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, 'src/app'),
			'@auth': path.resolve(__dirname, 'src/app/providers/auth'),
			'@router': path.resolve(__dirname, 'src/app/providers/router'),
			'@api': path.resolve(__dirname, 'src/entities/post/api'),
			'@counter': path.resolve(__dirname, 'src/features/counter'),
			'@post-filter': path.resolve(__dirname, 'src/features/post-filter'),
			'@post-form': path.resolve(__dirname, 'src/features/post-form'),
			'@post-item': path.resolve(__dirname, 'src/features/post-item'),
			'@post-list': path.resolve(__dirname, 'src/features/post-list'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@shared-hooks': path.resolve(__dirname, 'src/shared/lib/hooks'),
			'@shared-pagination': path.resolve(
				__dirname,
				'src/shared/lib/pagination'
			),
			'@shared-styles': path.resolve(__dirname, 'src/shared/styles'),
			'@shared-ui': path.resolve(__dirname, 'src/shared/ui'),
			'@widgets': path.resolve(__dirname, 'src/widgets'),
			'@features': path.resolve(__dirname, 'src/features'),
			'@entities': path.resolve(__dirname, 'src/entities'),
			'@shared': path.resolve(__dirname, 'src/shared'),
		},
	},
});
